const ExtendableError = require('./extendable')

class ForbiddenError extends ExtendableError {
  constructor(message = 'You do not have access to this resource') {
    super(message)
    this.status = 403
  }
}

module.exports = ForbiddenError
