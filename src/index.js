const { generateResponse, validateAttributes } = require('./helper')
const { createPdfAndUploadToS3, requiredAttributes } = require('./core')

async function main(event) {
  if (!Object.keys(event).length || !event.body) {
    return generateResponse(404, { message: 'No content' })
  }

  const reqBody = typeof event.body == 'string' ? JSON.parse(event.body) : event.body
  if (!validateAttributes(reqBody, requiredAttributes)) {
    return generateResponse(400, { message: `Missing attribute, It should contain the following attributes. ${requiredAttributes}` })
  }

  const url = await createPdfAndUploadToS3(reqBody, reqBody.pageConfig)
  const res = await generateResponse(200, { url })
  return res
}

exports.handler = main
