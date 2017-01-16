module.exports = validation => {
  return validation.error && validation.error.details.reduce((result, current) => {
    result[current.path] = result[current.path]
      ? result[current.path].concat(current.message)
      : [current.message]
    return result
  }, {})
}
