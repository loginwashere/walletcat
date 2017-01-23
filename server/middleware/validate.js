const Joi = require('joi')
const errorMessages = require('../utils').errorMessages
const ValidationError = require('../errors/validation')

module.exports = schema => (req, res,next) => {
  const validationErrors = Joi.validate(req.body, schema, { abortEarly: false })
  if (validationErrors.error) {
    return next(new ValidationError(errorMessages(validationErrors)))
  }
  next()
}
