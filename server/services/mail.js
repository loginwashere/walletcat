const Mailgun = require('mailgun-js')
const config = require('../config')

const mailgun = new Mailgun({
  apiKey: config.mail.mailgun.apiKey,
  domain: config.mail.mailgun.domain
})

module.exports.send = data => mailgun.messages().send(data)
