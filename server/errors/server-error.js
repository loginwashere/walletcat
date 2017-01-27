const ExtendableError = require('./extendable')

class ServerError extends ExtendableError {
  constructor(error) {
    super(error.message)
    this.status = error.status || 500
    this.stack = error.stack
  }
}

module.exports = ServerError
