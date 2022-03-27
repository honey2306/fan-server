const mongoose = require('../../db/mongodb')

const FootPrintSchema = new mongoose.Schema({
  city: {
    type: Number,
    unique: true
  }
})

module.exports = mongoose.model('FootPrint', FootPrintSchema)
