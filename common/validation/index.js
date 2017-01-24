const Joi = require('joi')

const username = Joi.string().token().min(1).max(255)
const email = Joi.string().email().min(1).max(255)
const password = Joi.string().required().min(6).max(255)

const loginSchema = {
  login: Joi.alternatives().try(
    username,
    email
  ).required(),
  password
}

const registerSchema = {
  username: username.required(),
  email: email.required(),
  password
}

module.exports = {
  loginSchema,
  registerSchema
}