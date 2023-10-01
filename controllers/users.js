

const login = (req, res) => {
    res.json({ message: 'Login Page' })
}

const signup = (req, res) => {
  res.json({ message: 'Signup Page' })
}

module.exports = {
    login,
    signup
}