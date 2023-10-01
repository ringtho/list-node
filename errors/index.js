const CustomAPiError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnAuthenticatedError = require('./authentication')
const NotFoundError = require('./not-found')

module.exports = {
    CustomAPiError,
    BadRequestError,
    UnAuthenticatedError,
    NotFoundError
}