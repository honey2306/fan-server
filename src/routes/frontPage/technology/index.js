const express = require('express');
const router = express.Router();
const {Blog} = require('../../../model/technology/Blog')
const initData = require('../../../utils/returnData')
const {filterField} = require("../../utils/inedx");
const {to} = require("../../../utils/tools");
const e = require("express");

router.get('/blog/list', async (req, res) => {
  const query = req.query
  const returnData = {...initData}
  const filterData = {status: 1}
  let result = await Blog.find(filterData).sort({'_id': -1}).skip((query.page - 1) * query.pageSize).limit(query.pageSize || 10)
  const needfield = ['_id', 'desc', 'title', 'createTime', 'img']
  result = filterField(result, needfield)
  const total = await Blog.find(filterData).count()
  returnData.data = {
    data: result,
    total: total
  }
  res.send(returnData)
})

router.get('/blog/detail', async (req, res) => {
  const returnData = {...initData}
  const filterData = req.query
  if (filterData._id) {
    const {err, data} = await to(Blog.find(filterData).sort({'_id': -1}))
    if (err) {
      returnData.data = {}
    } else {
      returnData.data = data[0]
    }
  } else {
    returnData.code = -2
    returnData.msg = '参数错误'
  }
  res.send(returnData)
})


module.exports = router;
