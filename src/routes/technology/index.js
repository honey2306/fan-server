const express = require('express');
const router = express.Router();
const { Blog } = require('../../model/technology/Blog')
const initData = require('../../utils/returnData')
const { del, add, edit} = require("../../utils/tools");

router.get('/technology/list', async (req, res) => {
  const query = req.query
  const returnData = {...initData}
  const result = await Blog.find({}).sort({'_id': -1}).skip((query.page - 1) * query.pageSize).limit(query.pageSize || 10)
  const total = await Blog.count()
  returnData.data = {
    data: result,
    total: total
  }
  res.send(returnData)
})

router.post('/technology/add', async (req, res) => {
  req.body.author = req.session.name || '吴凡'
  add(req, res, Blog, {title: req.body.title}, ['title', 'img', 'typeId', 'content', 'status', 'author'])
})

router.put('/technology/edit', (req, res, next) => {
  edit(req, res, Blog, {title: req.body.title}, ['_id', 'title', 'img', 'typeId', 'content', 'status'])
})

router.post('/technology/del', (req, res, next) => {
  del(req, res, '_id', Blog)
})


module.exports = router;
