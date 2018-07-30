var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var session = require('cookie-session');

var config = require('./config');

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: config.secret,
	httpOnly:false
}));

//Parte III
app.use(express.static(__dirname + '/public'));

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: config.secret,
	httpOnly:false
}));

// use JWT auth to secure the api
app.use('/api', expressJwt({ 
	secret: config.secret,
	getToken: function fromCookie (req) {
	    var token = req.session.token;
	    if (token) {
	      	return token;
	    } 
    return null; 
	}
}).unless({ path: ['/api/authentication/login', '/api/authentication/register'] }));

if(process.env.NODE_ENV!=='production'){
	//MORGAN USE FOR SEE BEAUTY REQUEST FOR THE SERVER
	var morgan = require('morgan');
	app.use(morgan('dev'));

	mongoose.connect(config.database); 
} else {
	mongoose.connect(config.databaseProd); 
}

//BODY PARSER: MIDLEWARE USING FOR HANDLING BODY REQUEST
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/authentication', require('./api/authentication/authentication.routes'));
app.use('/api/user', require('./api/user/user.routes'));
app.use('/api/store', require('./api/store/store.routes'));

//CONFIGURE OUR APPLICATION
var port = process.env.PORT || 3000; 

app.listen(port,function(){
	console.log("Running localhost port: "+port);
})