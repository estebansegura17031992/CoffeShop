var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.get('/infoUser',controller.infoUser);
router.post('/editUser/:id',controller.editUser);
router.post('/logOut/:id',controller.logOut);

module.exports = router;