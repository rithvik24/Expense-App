const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minlength:[6, 'username should have minimum 6 characters'],
        maxlength: [64, 'username cannot have more than 64 characters'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
          validator: function(value){
            return isEmail(value)
          },
          message: function(props){
            return `invalid email format ${props.value}`
          }  
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password should contain minimum 8 characters'],
        maxlength: [128, 'password cannot have more than 128 characters']
    }
},{timestamps: true})

userSchema.pre('save', function(next){
  const user = this
  bcrypt.genSalt(10)
    .then((salt) => {
      bcrypt.hash(user.password, salt)
        .then((encrypted) => {
          user.password = encrypted
          next()
        })
    })
})

const User = mongoose.model('User',userSchema)

module.exports = User