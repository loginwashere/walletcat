const ExtendableError = require('./extendable')

class ValidationError extends ExtendableError {
  constructor(errors) {
    super()
    this.errors = errors
    this.status = 400
  }
}

module.exports = ValidationError
