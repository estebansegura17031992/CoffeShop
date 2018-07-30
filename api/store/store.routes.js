var express = require('express');
var controller = require('./store.controller.js');

var router = express.Router();

router.post("/addStore",controller.addStore);
module.exports = router;
