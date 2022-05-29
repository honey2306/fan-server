const mongoose = require('../../db/mongodb')

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  desc: {
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

const Blog = mongoose.model('Blog', BlogSchema)
module.exports = {Blog}
