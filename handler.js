'use strict';
const AWS = require('aws-sdk')

module.exports.create = async event => {

  const bodyObj = JSON.parse(event.body)

  const putParams = {
    TableName: process.env.DYNAMODB_CONTACT_TABLE,
    Item: {
      email: bodyObj.email,
      createdAt: parseInt(Date.now() / 1000),
      firstname: bodyObj.firstname,
      surname: bodyObj.surname,
      phone: bodyObj.phone
    }
  }

  let putResultsObj = {}

  try {
    const dynamodb = new AWS.DYNOMODB.DocumentClient()
    putResultsObj = await dynamodb.put(putParams).promise()
  } catch (putError) {
    console.log("There was an error putting item", putError)
    console.log('putParams', putParams)
    return new Error("There was an error putting item")
  }

  console.log('putResultsObj', putResultsObj)

  return {
    statusCode: 201
  }
  
}

module.exports.get = async event => {
  
}
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
