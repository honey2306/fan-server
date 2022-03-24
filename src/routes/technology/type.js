const express = require('express');
const router = express.Router();
const {TecType} = require('../../model/technology/TecType')
const initData = require('../../utils/returnData')
const {judgeParam, to, del, add, edit} = require("../../utils/tools");

router.get('/type/list', async (req, res) => {
  const query = req.query
  const returnData = {...initData}
  const result = await TecType.find({}, {
    _id: 1,
    type: 1
  }).sort({'_id': -1}).skip((query.page - 1) * query.pageSize).limit(query.pageSize || 10)
  const total = await TecType.count()
  returnData.data = {
    data: result,
    total: total
  }
  res.send(returnData)
})

router.post('/type/add', async (req, res) => {
  const returnData = {...initData}
  add(req, res, TecType, {type: req.body.type}, ['type'])
})

router.put('/type/edit', (req, res, next) => {
  edit(req, res, TecType, {type: req.body.type}, ['_id', 'type'])
})

router.post('/type/del', (req, res, next) => {
  del(req, res, '_id', TecType)
})


module.exports = router;
