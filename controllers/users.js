const User = require('../models/user')

const login = (req, res) => {
    res.json({ message: 'Login Page' })
}

const signup = (req, res) => {
  const { firstName, lastName, email, password } = req.body
  res.json({ msg: req.body })
}

module.exports = {
    login,
    signup
}