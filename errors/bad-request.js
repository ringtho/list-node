const CustomAPiError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends CustomAPiError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError
