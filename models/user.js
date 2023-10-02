const mongoose = require('mongoose')
const { Schema } = mongoose

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/** Model Setup for users **/
const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'Please provide a first name'],
    minlength: [2, 'First name should be more than 1 Character'],
    maxlength: 255,
  },
  last_name: {
    type: String,
    required: [true, 'Please provide a last name'],
    minlength: [2, 'Last name should be more than 1 Character'],
    maxlength: 255,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6
  }
}, {timestamps: true})

/* 
  Method for hashing the password as the 
  new users details are saved 
*/
userSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

/* Method for creating the JWT token in the model */
userSchema.methods.createJwt = function () {
    return jwt.sign(
        { userId: this._id, first_name: this.first_name, last_name: this.last_name }, 
        process.env.JWT_SECRET, { expiresIn: '30d' })
}

/* 
  Method for checking the password provided against 
  the password in the database. 
  - This method returns true if it matches and 
  - false if it doesn't
*/
userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)