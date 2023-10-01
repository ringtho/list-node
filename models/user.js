const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  fname: {
    type: String,
    required: [true, 'Please provide a first name'],
    minlength: [2, 'First name should be more than 1 Character'],
    maxlength: 255,
  },
  lname: {
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
})

module.exports = mongoose.model('User', userSchema)