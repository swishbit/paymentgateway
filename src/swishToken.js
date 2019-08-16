const swish = require("./api/swish")

module.exports.swishToken = (e, ctx, callback) => {
  const { amount, address } = e.queryStringParameters
  swish
    .getToken({ amount, address })
    .then(token =>
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: token
      })
    )
    .catch(err => callback(err.message))
}
