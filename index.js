const { generateResponse, validateAttributes } = require('./utils/helper')
const { createPdfAndUploadToS3, requiredAttributes } = require('./utils/core')

async function main(event) {
  if (!Object.keys(event).length || !event.body) {
    return generateResponse(404, { message: 'No content' })
  }

  const reqBody = JSON.parse(event.body)
  if (!validateAttributes(reqBody, requiredAttributes)) {
    return generateResponse(400, {message: `Missing attribute, It should contain the following attributes. ${requiredAttributes}` })
  }

  const url = await createPdfAndUploadToS3(reqBody)
  const res = await generateResponse(200, { url })
  console.log(res)
  return res
}

exports.handler = main
