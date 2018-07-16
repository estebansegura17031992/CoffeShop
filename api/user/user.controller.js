'use strict'
var express = require('express');
var User = require('./user.model.js');

var infoUser = function(req,res,next){
	User.findById(req.user._id,function(error,user){
		if(error){
			return res.json({"status":"fail","message":"error in database","detail":error});
		} else {
			return res.json({"username":user.username,"email":user.email, "userId":user._id});
		}
	});
}

var editUser = function(req,res,next){
    if (req.params.id !== req.user._id) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    User.update({_id:req.user._id}, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

var logOut = function(req,res,next){
	req.session = null;
	res.sendStatus(200);
}

var controller = {
	infoUser:infoUser,
	editUser:editUser,
	logOut:logOut
}

module.exports = controller;