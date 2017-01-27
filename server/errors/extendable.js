class ExtendableError extends Error {
  constructor(message) {
    super()
    this.name = this.constructor.name
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ExtendableError
