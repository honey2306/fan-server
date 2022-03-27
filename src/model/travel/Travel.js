const mongoose = require('../../db/mongodb')

const TravelSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  img: {
    type: String,
    require: true
  },
  place: {
    type: Object,
    require: true
  },
  browseNum: {
    type: String
  },
  content: {
    type: String,
    require: true
  },
  typeId: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model('Travel', TravelSchema)
