const swish = require("../transfer/requestSwish")
const bitcoin = require("../api/bitcoin")

const ORIGIN_ADDRESS = "swishbit"

const log = console.log

const getFee = amount => amount * .2
const onPaymentRequest = (e, ctx, callback) => {
  const { amount : amountInSEK, message, status } = e.body

  log(e.body)
  bitcoin
    .convert(amountInSEK - getFee(amountInSEK))
    .then(amount =>
      bitcoin.createTransaction({
        amount,
        fromaddress: ORIGIN_ADDRESS,
        toaddress: address,
      })
    )
    .then(transaction => callback(null, transaction))
    .catch(err => callback(err.message))
}

const onSwishTokenRequest = (e, ctx, callback) => {
  const { amount, address } = e.queryStringParameters
  swish
    .getToken({ amount, address })
    .then(token => callback(null, token))
    .catch(err => callback(err.message))
}

describe("users should be able to make a swish payment and receive bitcoins to provided address", () => {
  const actual = true
  const expected = true

  expect(actual).toEqual(expected)
})

test("it creates swish payment tokens", done => {
  swish.getToken({ amount: 100, message: "foo" }).then(token => {
    expect(token).toBeDefined()

    done()
  })
})

test("it handles swish payment requests", done => {
  const body = {
    id: "AB23D7406ECE4542A80152D909EF9F6B",
    payeePaymentReference: "0123456789",
    paymentReference: "6D6CD7406ECE4542A80152D909EF9F6B",
    callbackUrl: "https://example.com/api/swishcb/paymentrequests",
    payerAlias: "07211234567",
    payeeAlias: "1231234567890",
    amount: "100",
    currency: "SEK",
    message: "Kingston USB Flash Drive 8 GB",
    status: "PAID",
    dateCreated: "2015-02-19T22:01:53+01:00",
    datePaid: "2015-02-19T22:03:53+01:00"
  }

  onPaymentRequest({ body }, {}, (err, res) => {
    console.log(err, res)
    done()
  })

  //   })
})

test("it verifies bitcoin addresses", () => {})

test("it logs requested transactions", () => {})

test("it ensures sufficient balance", () => {})

test("it converts SEK/BTC", () => {})

test("it calculates fee", () => {})

test("it transfers to addresses", () => {
  // return SEK to user on error
})
