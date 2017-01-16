const Joi = require('joi')

const loginSchema = {
  login: Joi.alternatives().try(
    Joi.string().email().min(6).max(255),
    Joi.string().token().min(1).max(255)
  ).required(),
  password: Joi.string().required().min(6).max(255)
}

module.exports = {
  loginSchema
}