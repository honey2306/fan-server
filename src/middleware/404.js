const createError = require("http-errors")

module.exports.getNotFound = (req, res, next) => {
  next(createError(404))
}
