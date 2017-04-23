import mongoose from 'mongoose'
import validate from 'mongoose-validator'
import bcrypt from 'bcryptjs'

const emailValidator = [
  validate({
    isAsync: true,
    validator: 'isEmail',
    message: 'is not valid'
  })
]

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: emailValidator
  },
  password: {
    type: String,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  versionKey: false
})

export default mongoose.model('user', userSchema)