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

var shop = function(req,res,next){
	var carShopping = req.body.carShop;
	
	var priceProduct = 0;
	for (let i = 0; i < carShopping.length; i++) {
		priceProduct = priceProduct + carShopping[i].priceProduct;	
	}

	carShopping = {products:req.body.carShop,priceProduct:priceProduct}

	var tempUser = null;
	User.findById({_id:req.user._id},function(err,user){
		tempUser = user.shopping;
		tempUser.push(carShopping);

		console.log(tempUser);
		if(tempUser != null){
			User.update({_id:req.user._id}, { $set: { shopping: tempUser }},function(){
				return res.status(200).send({success: true});
			})
		}
	})
}

var getShop = function(req,res,next){
	User.findById({_id:req.user._id},function(err,user){
		if(err){
			return res.status(400).send({success:false});
		} else {
			return res.status(200).send({success: true,shopping: user.shopping});	
		}
	})
}

var controller = {
	infoUser:infoUser,
	editUser:editUser,
	logOut:logOut,
	shop:shop,
	getShop: getShop
}

module.exports = controller;