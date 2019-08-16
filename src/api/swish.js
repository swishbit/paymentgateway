const fs = require("fs")
const path = require("path")
const request = require("request")

const { mergeDeep } = require("./utils/mergeDeep")

const options = {
  agentOptions: {
    pfx: fs.readFileSync(
      __dirname + "/ssl/Swish Merchant Test Certificate 1231181189.p12"
    ),
    passphrase: "swish" // TODO: process.env.SWISH_PASSPHRASE
  },
  url: "https://mss.swicpc.bankgirot.se/swish-cpcapi/api/v1/paymentrequests/",
  headers: {
    "content-type": "application/json"
  },
  json: true,
  body: {
    callbackUrl: "https://<aws_lambda>/paymentrequests",
    currency: "SEK",
    payeeAlias: "1231181189"
    // payeePaymentReference: "0123456789",
  }
}

module.exports.getToken = ({ amount, message } = {}) =>
  new Promise((resolve, reject) =>
    request.post(
      mergeDeep(options, { body: { amount, message } }),
      (err, res) =>
        err ? reject(err) : resolve(res.headers.paymentrequesttoken)
    )
  )
