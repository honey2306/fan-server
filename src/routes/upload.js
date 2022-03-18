const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const returnData = require('../utils/returnData')
const path = require("path")
const momemt = require("moment")
const { writeFileByUser, deleteAll } = require('../utils/tools')

let upload = multer({dest: 'uploads/'})
router.post('/upload', upload.single('img'), ((req, res) => {
  const initData = returnData
  const nowDate = momemt().format('YYYY-MM-DD')
  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      console.log('文件读取失败')
      initData.code = -2
      res.send(initData)
    }

    let extname = path.extname(req.file.originalname)
    const name = `${Date.now()}${extname}`
    writeFileByUser(path.join(__dirname, `../../statics/upload/${nowDate}/${name}`), data, (err) => {
      if (err) {
        console.log('文件写入失败')
        initData.code = -2
        res.send(initData)
      }
      deleteAll(path.join(__dirname, '../../uploads'))
      initData.data = {
        url: `http://api-test.netease.com:3000/upload/${nowDate}/${name}`
      }
      res.send(initData)
    })
  })
}))

module.exports = router
