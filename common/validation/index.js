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

const emailConfirmSchema = {
  emailConfirm: Joi.string().required()
}

const categorySchema = {
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(255).empty(''),
}

const accountSchema = {
  name: Joi.string().min(1).max(255).required(),
  currencyId: Joi.string().guid({ version: 'uuidv4' }).required(),
  description: Joi.string().max(255).empty(''),
  amount: Joi.number().min(0).precision(8).max(99999999999)
}

const transactionSchema = {
  fromAccountId: Joi.string().guid({ version: 'uuidv4' }).required(),
  toAccountId: Joi.string().guid({ version: 'uuidv4' }).required(),
  fromAmount: Joi.number().positive().precision(8).max(99999999999).required(),
  toAmount: Joi.number().positive().precision(8).max(99999999999).required(),
  fromRate: Joi.number().positive().precision(8).max(99999999999).required(),
  toRate: Joi.number().positive().precision(8).max(99999999999).required(),
  categoryId: Joi.string().guid({ version: 'uuidv4' }).required(),
  date: Joi.date().required(),
  description: Joi.string().max(255).empty('')
}

module.exports = {
  loginSchema,
  registerSchema,
  emailConfirmSchema,
  categorySchema,
  accountSchema,
  transactionSchema
}