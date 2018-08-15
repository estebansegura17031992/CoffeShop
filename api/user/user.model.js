'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var productSchema = new Schema({
    nameProduct: {
        type: String,
        required: true
    },
    priceProduct: {
        type: Number,
        required: true
    },
    descriptionProduct: {
        type: String,
        requiered: true
    }
});

var carShopingSchema = new Schema({
	products: [productSchema],
	priceProduct: {
		type:Number,
		required:true
	},
	date:{
		type: Date,
		default: Date.now
	}
})

var UserSchema = new Schema({
	fullName: {
		type: String,
		require: true
	},
	username: {
		type: String,
		require: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	admin: {
		type: Boolean,
		require: true,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	},
	shopping: [carShopingSchema]
});

UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password,this.password)
}

var User = mongoose.model('User',UserSchema);

module.exports = User;