const AWS = require('aws-sdk')
const puppeteer = require('puppeteer-core')
const chromium = require('@sparticuz/chromium')
const { version } = require('node:process')

chromium.setHeadlessMode = true
chromium.setGraphicsMode = false

async function getBrowser() {
  console.log('browser request with node:' + version)
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })
  console.log('browser launch' + browser)
  return browser
}

const requiredAttributes = ['htmlContent', 's3Path', 's3FilePublic', 's3Region', 's3Bucket', 's3KeyId', 's3SecretKey']
// return the uploaded URL
async function createPdfAndUploadToS3({ htmlContent, s3Path, s3FilePublic, s3Region, s3Bucket, s3KeyId, s3SecretKey }, pageConfig = {}) {
  const browser = await getBrowser()
  const page = await browser.newPage()
  console.log('browser new page')
  const content = htmlContent
    .replace(/\\"/g, '"')
    .replace(/\\u003c/g, '<')
    .replace(/\\u003e/g, '>')
  await page.setContent(content)
  await page.emulateMediaType('screen')
  console.log('starting pdf generation')
  const Body = await page.pdf({
    format: 'a4',
    printBackground: true,
    margin: {
      top: 30,
      right: 0,
      bottom: 30,
      left: 0,
    },
    ...pageConfig,
  })
  console.log('end pdf generation')
  await browser.close()
  console.log('browser close & file upload start')

  AWS.config.update({ accessKeyId: s3KeyId, secretAccessKey: s3SecretKey, region: s3Region, signatureVersion: 'v4' })
  const s3 = new AWS.S3()
  const dataset = {
    Bucket: s3Bucket,
    Key: s3Path,
    Body,
    ContentType: 'application/pdf',
    ACL: !!s3FilePublic ? 'public-read' : 'private',
  }
  const response = await s3.upload(dataset).promise()
  console.log('file upload done at: ' + response.Location)
  return response.Location
}

module.exports = { getBrowser, createPdfAndUploadToS3, requiredAttributes }
