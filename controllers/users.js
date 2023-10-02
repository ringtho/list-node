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
    const isPasswordCorrect = await user.checkPassword(password)
    if(!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials')
    }
    const { first_name, last_name } = user
    const token = user.createJwt()
    res.json({ user: {first_name, last_name}, token })
}

const signup = async (req, res) => {
  const user = (await User.create(req.body))
  const { first_name, last_name, email } = user
  res.status(StatusCodes.CREATED).json({ user: 
    { first_name, last_name, email } 
  })
}

const getUser = async (req, res) => {
  const { userId } = req.user
  const user = await User.findOne({ _id: userId }).select(
    'first_name last_name email')
  res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {
  const { userId } = req.user
  const { first_name, last_name, password } = req.body
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { first_name, last_name, password },
    { new: true, runValidators: true }
  ).select('-password -_id')
  res.status(StatusCodes.OK).json({ user })
}

module.exports = {
    login,
    signup,
    getUser,
    updateUser
}