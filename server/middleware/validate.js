const Joi = require('joi')
const errorMessages = require('../utils').errorMessages
const ValidationError = require('../errors/validation')

const validate = type => schema => (req, res, next) => {
  const validationErrors = Joi.validate(req[type], schema, { abortEarly: false })
  if (validationErrors.error) {
    return next(new ValidationError(errorMessages(validationErrors)))
  }
  next()
}

module.exports = {
  query: validate('query'),
  body: validate('body')
}
