const { CustomAPiError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const errorHandler = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomAPiError) {
        res.status(err.statusCode).json({ msg: err.message })
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Something is wrong, Please try again later' })
    next()
}

module.exports = errorHandler