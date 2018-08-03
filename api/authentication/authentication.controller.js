'use strict'
var User = require('../user/user.model')
var jwt = require('jsonwebtoken');
var config = require('../../config');
var bcrypt = require('bcrypt');
/*
Verify if the Json Web Token exist
*/
function authentication(req,res,next){
	// check session for token
	var token = req.session.token
	
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {      
		 	if (err) {
		    	return res.json({ success: false, message: 'Failed to authenticate token.' });    
		  	} else {      
		    	next();
		  	}
		});

	} else {
	    // if there is no token
	    return res.json({ success: false, message: 'No token provide.' });
 	}
}

function login(req,res,next){
	// find the user
	User.findOne({email: req.body.email}, function(err, user) {

		if (err) throw err;

		if (!user) {
		  res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			// check if password matches
			if (!user.comparePassword(req.body.password)) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				// if user is found and password is right create a token with only our given payload
				const payload = {
				 	admin: user.admin,
				 	_id: user._id
				};

			    var token = jwt.sign(payload, config.secret);
				req.session.token = token;
				//En la respuesta se envia si el usuario que se identifico con sus credenciales es admin o usuario
			    return res.status(200).send({success: true, message: 'Authentication complete',isAdmin:user.admin,token:token});
		  	}   
		}
	});
}

function register(req,res,next){
	var newUser = new User(req.body);
  	newUser.password = bcrypt.hashSync(req.body.password, 10);
  	newUser.save(function(err, user) {
    	if (err) {
      		return res.status(400).send({success: false,message: err});
    	} else {
      		user.password = undefined;
      		return res.status(200).send({success: true,user:user});
    	}
  	});

}

var controller = {
	authentication:authentication,
	login: login,
	register: register
}

module.exports = controller