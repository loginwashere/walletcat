const Joi = require('joi')

const username = Joi.string().token()
  .min(1)
  .max(255)
const email = Joi.string().email()
  .min(1)
  .max(255)
const password = Joi.string().required()
  .min(6)
  .max(255)

const loginSchema = {
  login: Joi.alternatives()
    .try(
      username,
      email
    )
    .required(),
  password
}

const registerSchema = {
  username: username.required(),
  email: email.required(),
  password
}

const resendEmailConfirmSchema = {
  email: email.required(),
}

const emailConfirmSchema = {
  emailConfirm: Joi.string().required()
}

const agentSchema = {
  name: Joi.string().min(1)
    .max(255)
    .required(),
  description: Joi.string().max(255)
    .empty('')
    .allow(null),
}

const categorySchema = {
  name: Joi.string().min(1)
    .max(255)
    .required(),
  description: Joi.string().max(255)
    .empty('')
    .allow(null),
}

const accountSchema = {
  name: Joi.string().min(1)
    .max(255)
    .required(),
  currencyId: Joi.string().guid({ version: 'uuidv4' })
    .required(),
  agentId: Joi.string().guid({ version: 'uuidv4' })
    .required(),
  description: Joi.string().max(255)
    .empty('')
    .allow(null),
  amount: Joi.number().min(0)
    .precision(8)
    .max(99999999999)
}

const transactionSchema = {
  transactionItems: Joi.array()
    .min(2)
    .items(Joi.object({
      id: Joi.alternatives()
      .try(
        Joi.string().empty('')
          .allow(null),
        Joi.string().guid({ version: 'uuidv4' })
      ),
      accountId: Joi.string().guid({ version: 'uuidv4' })
        .required(),
      amount: Joi.number().min(0)
        .precision(8)
        .max(99999999999)
        .required(),
      rate: Joi.number().positive()
        .precision(8)
        .max(99999999999)
        .required(),
      type: Joi.any().valid(['debit', 'credit'])
    })),
  categoryId: Joi.string().guid({ version: 'uuidv4' })
    .required(),
  date: Joi.date().required(),
  description: Joi.string().max(255)
    .empty('')
    .allow(null)
}

const paginationSchema = {
  limit: Joi.number().positive()
    .max(50)
    .empty(10),
  page: Joi.number().positive()
    .max(1000)
    .empty(1),
  filterName: Joi.string().empty(''),
  filterValue: Joi.alternatives()
    .try(
      Joi.string().empty(''),
      Joi.array()
        .items(Joi.string())
        .empty('')
    )
}

module.exports = {
  loginSchema,
  registerSchema,
  emailConfirmSchema,
  resendEmailConfirmSchema,
  categorySchema,
  agentSchema,
  accountSchema,
  transactionSchema,
  paginationSchema
}