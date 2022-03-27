const mongoose = require('../../db/mongodb')

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  passWord: {
    type: String
  }
})

module.exports = mongoose.model('User', UserSchema)
