const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('../config')
const errorMessages = require('./errorMessages')

module.exports.generateToken = userId => ({
  id: userId,
  value: jwt.sign(
    { sub: userId },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES }
  )
})

module.exports.hashPassword = password => {
  return crypto
    .createHmac('sha256', config.HASH_SECRET)
    .update(password)
    .digest('hex')
}

const md5 = string => {
  return crypto
    .createHash('md5')
    .update(string)
    .digest("hex");
}

module.exports.generateAvatarUrl = email => (
  `https://www.gravatar.com/avatar/${md5(email)}?s=50`
)

module.exports.errorMessages = errorMessages
