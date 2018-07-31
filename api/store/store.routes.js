var express = require('express');
var controller = require('./store.controller.js');

var router = express.Router();

router.post("/addStore",controller.addStore);
router.get("/getStores",controller.getStores);
router.get("/infoStore/:id",controller.infoStore);
module.exports = router;
