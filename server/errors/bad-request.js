const ExtendableError = require('./extendable')

class BadRequestError extends ExtendableError {
  constructor(message = 'Bad request') {
    super(message)
    this.status = 400
  }
}

module.exports = BadRequestError
