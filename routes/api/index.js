var express = require('express');
var router = express.Router();
const unversityRouter = require('./university/index');

router.use('/university', unversityRouter);

module.exports = router;
