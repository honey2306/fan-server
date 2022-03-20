const mongoose = require('../../db/mongodb')

const TecTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    require: true
  }
})

const TecType = mongoose.model('TecType', TecTypeSchema)
module.exports = {TecType}
