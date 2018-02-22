'use strict'
var express = require('express');
var User = require('./user.model.js');
90
var infoUser = function(req,res,next){
	console.log(req.user._id);
	User.findById(req.user._id,function(error,user){
		if(error){
			return res.json({"status":"fail","message":"error in database","detail":error});
		} else {
			return res.json({"username":user.username,"email":user.email});
		}
	});
}

var controller = {
	infoUser:infoUser
}

module.exports = controller;