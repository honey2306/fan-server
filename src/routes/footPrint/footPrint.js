const express = require('express');
const router = express.Router();
const FootPrint = require('../../model/footPrint/FootPrint')
const initData = require('../../utils/returnData')
const {del, add} = require("../../utils/tools");

router.get('/footPrint/list', async (req, res) => {
  const returnData = {...initData}
  returnData.data = await FootPrint.find({}, {
    _id: 1,
    city: 1
  }).sort({'_id': -1})
  res.send(returnData)
})

router.post('/footPrint/add', async (req, res) => {
  add(req, res, FootPrint, {city: req.body.city}, ['city'])
})

router.post('/footPrint/del', (req, res, next) => {
  del(req, res, '_id', FootPrint)
})


module.exports = router;
