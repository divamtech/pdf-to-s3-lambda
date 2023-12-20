function generateResponse(code, body) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  }
}

function validateAttributes(obj, requiredAttributes) {
  for (let i = 0; i < requiredAttributes.length; i++) {
    if (!obj.hasOwnProperty(requiredAttributes[i])) {
      console.log(`Missing attribute ${requiredAttributes[i]}`)
      return false // If any attribute is missing, return false
    }
  }
  return true // If all attributes are present, return true
}

module.exports = { generateResponse, validateAttributes }
