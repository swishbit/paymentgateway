const fs = require("fs")
const path = require("path")
const request = require("request")

const certPath = path.resolve(
  __dirname,
  "..",
  "cert/swish/Swish Merchant Test Certificate 1231181189.p12",
)

const url =
  "https://mss.swicpc.bankgirot.se/swish-cpcapi/api/v1/paymentrequests/"
const agentOptions = {
  pfx: fs.readFileSync(certPath),
  passphrase: "swish", // TODO: process.env.SWISH_PASSPHRASE
}

const body = {
  // payeePaymentReference: "0123456789",
  callbackUrl: "https://example.com/api/swishcb/paymentrequests",
  payeeAlias: "1231181189",
  amount: "100",
  currency: "SEK",
  message: "btc address",
}
const options = {
  agentOptions,
  url,
  headers: {
    "content-type": "application/json",
  },
  json: true,
  body,
}

module.exports.endpoint = (event, context, callback) => {
  // request.post(options, (err, res, body) => {
  //   // console.log(err, res)
  //   console.log(res.toJSON())
  //   console.log(body)
      // callback(null, response)
  // })

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }

  callback(null, response)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event })
}
