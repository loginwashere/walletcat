const ExtendableError = require('./extendable')

class NotFoundError extends ExtendableError {
  constructor(message = 'The requested resource couldn\'t be found') {
    super(message)
    this.status = 404
  }
}

module.exports = NotFoundError
