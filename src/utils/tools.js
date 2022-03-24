const fs = require('fs')
const initData = require("./returnData");
const {TecType} = require("../model/technology/TecType");

const dirCache = {}

const writeFileByUser = (filePath, data, cb) => {
  if (!fs.existsSync(filePath)) {
    mkdir(filePath, data, cb)
  }
}

const mkdir = (filePath, data, cb) => {
  const arr = filePath.split('\\')
  let dir = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (!dirCache[dir] && !fs.existsSync(dir)) {
      dirCache[dir] = true
      fs.mkdirSync(dir)
    }
    dir = dir + '/' + arr[i]
  }
  fs.writeFile(filePath, data, cb)
}


const deleteAll = (path) => {
  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file) {
      var curPath = path + "/" + file
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteAll(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
  }
}

const judgeParam = (obj, res, param) => {
  const returnData = {...initData}
  let flag = true
  param.forEach((item) => {
    if (!Object.prototype.hasOwnProperty.call(obj.body, item)) {
      flag = false
      returnData.code = -2
      returnData.msg = '参数错误'
    }
  })
  !flag && res.send(returnData)
  return flag
}

const to = (promise) => {
  return promise
    .then((data) => {
      return {
        data,
        err: null
      }
    })
    .catch((err) => {
      return {
        data: null,
        err
      }
    })
}

const del = async (req, res, key, dbSchema) => {
  const returnData = {...initData}
  if (judgeParam(req, res, [key])) {
    const value = req.body[key]
    const {err, data} = await to(dbSchema.findOne({key: value}))
    if (err || data === null) {
      returnData.code = -2
      returnData.msg = '没有找到该类型'
      res.send(returnData)
    } else {
      const {err} = await to(dbSchema.findByIdAndDelete(value))
      if (err) {
        returnData.code = -2
        returnData.msg = '修改失败'
      }
      res.send(returnData)
    }
  }
}


const edit = async (req, res, dbSchema, unique, param) => {
  const returnData = {...initData}
  if (judgeParam(req, res, param)) {
    const {data, err} = await to(dbSchema.find({_id: { $ne: req.body._id}}).or(unique))
    if (data.length > 0 || err) {
      returnData.code = -2
      returnData.msg = '重复创建'
      res.send(returnData)
    } else {
      const obj = {}
      let id = 0
      param.forEach((item) => {
        if (item === '_id') {
          id = req.body._id
        } else {
          obj[item] = req.body[item]
        }
      })
      console.log(id, obj)
      const {err, data} = await to(dbSchema.findByIdAndUpdate(id, obj))
      if (err) {
        console.log(err)
        returnData.msg = '修改失败'
      } else {
        returnData.data = {
          _id: data._id
        }
      }
      res.send(returnData)
    }
  }
}

const add = async (req, res, dbSchema, unique, param) => {
  const returnData = {...initData}
  if (judgeParam(req, res, param)) {
    const {data, err} = await to(dbSchema.find({}).or(unique))
    if (data.length > 0 || err) { // 存在相同属性的值或者查找出错
      returnData.code = -2
      returnData.msg = '重复创建'
      res.send(returnData)
    } else {
      const obj = {}
      param.forEach((item) => {
        obj[item] = req.body[item]
      })
      const {err, data} = await to(dbSchema.create(obj))
      if (err) {
        returnData.code = -2
        returnData.msg = '创建失败'
      } else {
        returnData.data = {
          _id: data._id
        }
      }
      res.send(returnData)
    }
  }
}


module.exports = {writeFileByUser, deleteAll, judgeParam, to, del, edit, add}
