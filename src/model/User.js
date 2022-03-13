const mongoose = require('../db/mongodb')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    passWord: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = { User }
