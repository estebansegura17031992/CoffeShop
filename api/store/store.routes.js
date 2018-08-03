var express = require('express');
var controller = require('./store.controller.js');

var router = express.Router();

router.post("/addStore",controller.addStore);
router.get("/getStores",controller.getStores);
router.get("/infoStore/:id",controller.infoStore);
router.post("/:id/addBranch",controller.addBranch);
router.get("/:idStore/branch/:idBranch",controller.getInfoBranch);
module.exports = router;
