const express = require('express');
const router = express.Router();
const Travel = require('../../model/travel/Travel')
const initData = require('../../utils/returnData')
const {del, add, edit, judgeParam} = require("../../utils/tools");

router.get('/travel/list', async (req, res) => {
  const query = req.query
  const returnData = {...initData}
  const result = await Travel.find({}).sort({'_id': -1}).skip((query.page - 1) * query.pageSize).limit(query.pageSize || 10)
  const total = await Travel.count()
  returnData.data = {
    data: result,
    total: total
  }
  res.send(returnData)
})

router.post('/travel/add', async (req, res) => {
  req.body.author = req.session.name || '吴凡'
  if (judgeParam(req.body, res, ['place']) && judgeParam(req.body.place, res, ['name', 'pname', 'location'])) {
    add(req, res, Travel, {title: req.body.title}, ['title', 'img', 'content', 'status', 'author', 'place'])
  }
})

router.put('/travel/edit', (req, res, next) => {
  if (judgeParam(req.body, res, ['place']) && judgeParam(req.body.place, res, ['name', 'pname', 'location'])) {
    edit(req, res, Travel, {title: req.body.title}, ['_id', 'title', 'img', 'content', 'status', 'place'])
  }
})

router.post('/travel/del', (req, res, next) => {
  del(req, res, '_id', Travel)
})


module.exports = router;
