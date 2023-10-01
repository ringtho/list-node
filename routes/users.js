const express = require('express')
const router = express.Router()

const authenticateUser = require('../middleware/authentication')

const { login, signup, getUser, updateUser } = require('../controllers/users')

router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/profile')
    .get(authenticateUser, getUser)
    .patch(authenticateUser, updateUser)

module.exports = router