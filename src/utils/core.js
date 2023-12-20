const AWS = require('aws-sdk')
const puppeteer = require('puppeteer-core')
const chromium = require('@sparticuz/chromium')

chromium.setHeadlessMode = true
chromium.setGraphicsMode = false

async function getBrowser() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })
  console.log('browser', browser)
  return browser
}

const requiredAttributes = ['htmlContent', 's3Path', 's3FilePublic', 's3Region', 's3Bucket', 's3KeyId', 's3SecretKey']
// return the uploaded URL
async function createPdfAndUploadToS3({ htmlContent, s3Path, s3FilePublic, s3Region, s3Bucket, s3KeyId, s3SecretKey }) {
  const browser = await getBrowser()
  const page = await browser.newPage()
  const content = htmlContent.replace(/\\"/g, '"').replace(/\\u003c/g, '<').replace(/\\u003e/g, '>')
  await page.setContent(content)
  await page.emulateMediaType('screen')
  const Body = await page.pdf({
    format: 'a4',
    printBackground: true,
    margin: {
      top: 30,
      right: 0,
      bottom: 30,
      left: 0,
    },
  })
  await browser.close()

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
  return response.Location
}

module.exports = { getBrowser, createPdfAndUploadToS3, requiredAttributes }
