const CustomAPiError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class UnAuthenticatedError extends CustomAPiError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthenticatedError