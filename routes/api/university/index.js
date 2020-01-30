var express = require('express');
var router = express.Router();
const newsRouter = require('./news');
const announceRouter = require('./announcement');
router.use('/news', newsRouter);
router.use('/announcement', announceRouter);

module.exports = router;
