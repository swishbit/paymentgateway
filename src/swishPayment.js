const bitcoin = require("./api/bitcoin")

const ORIGIN_ADDRESS = "swishbit"

const log = console.log

const getFee = amount => amount * 0.2

module.exports.swishPayment = (e, ctx, callback) => {
  const { amount: amountInSEK, message, status } = e.body

  log(e.body)
  bitcoin
    .convert(amountInSEK - getFee(amountInSEK))
    .then(amount =>
      bitcoin.createTransaction({
        amount,
        fromaddress: ORIGIN_ADDRESS,
        toaddress: address
      })
    )
    .then(transaction =>
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: transaction
      })
    )
    .catch(err => callback(err.message))
}
