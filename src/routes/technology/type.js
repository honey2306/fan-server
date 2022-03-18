const express = require('express');
const router = express.Router();
const { TecType } = require('../../model/TecType')
const initData = require('../../utils/returnData')

router.get('/type/list', async (req, res) => {
  res.send(returnData)
})

router.post('/type/add', async (req, res) => {
  const returnData = {...initData}
  const { type } = req.body
  if (type) {
    TecType.create({
      type,
    }, {unique: true},(err, ret) => {
      if (err) {
        console.log(err)
        returnData.code = -2
        returnData.msg = '创建失败'
      }
      res.send(returnData)
    })
  } else {
    returnData.code = -2
    returnData.msg = '参数不对'
    res.send(returnData)
  }
})

router.post('/type/edit', (req, res, next) => {
  const returnData = initData
  const newType = new Counter({
    _id: 'type',
    type: 1
  })
  newType.save((err, ret) => {
    if (err) {
      returnData.code = -2
      returnData.msg = '创建失败'
    }
    res.send(returnData)
  })
})

router.put('/type/del', (req, res, next) => {
  const returnData = {...initData}
  req.session.isLogin = null
  res.send(returnData)
})



module.exports = router;
