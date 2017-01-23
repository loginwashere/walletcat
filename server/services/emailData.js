const config = require('../config')
const generateToken = require('../utils').generateToken

const prepareRegisterTemplate = (data) => (`
<h1>Hello</h1>
<p>Thank you for registering on wallet.pp.ua.</p>
<p>To continue please confirm your email by visiting this link:</p>
<p><a href="${data.emailConfirmLink}">${data.emailConfirmLink}</a></p>
`)

const REGISTER = 'REGISTER'

module.exports.types = {
  REGISTER
}

module.exports.generate = (type, options = {}) => {
  switch (type) {
    case REGISTER:
      const emailConfirm = generateToken(options.user.email, '1d').value
      const emailConfirmLink = `${config.publicUrl}email-confirm/${emailConfirm}`
      return {
        from: config.mail.defaultFrom,
        to: options.user.email,
        subject: `[${config.projectName}] Please confirm your email`,
        html: prepareRegisterTemplate({emailConfirmLink})
      }
    default:
      throw new Error('Invalid email type')
  }
}
