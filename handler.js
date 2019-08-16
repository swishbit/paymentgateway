const { swishToken } = require("./src/swishToken")
const { swishPayment } = require("./src/swishPayment")

module.exports.onSwishToken = swishToken
module.exports.onSwishPayment = swishPayment
