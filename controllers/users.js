const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnAuthenticatedError } = require('../errors')

const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
      throw new BadRequestError('Please provide an email and password!')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = user.checkPassword(password)
    if(!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
    const { first_name, last_name } = user
    const token = user.createJwt()
    res.json({ user: {first_name, last_name}, token })
}

const signup = async (req, res) => {
  const user = await User.create(req.body)
  const { first_name, last_name, email } = user
  res.status(StatusCodes.CREATED).json({ user: 
    { first_name, last_name, email } 
  })
}

module.exports = {
    login,
    signup
}