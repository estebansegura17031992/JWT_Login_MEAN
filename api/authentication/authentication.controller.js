'use strict'
var User = require('../user/user.model')
var jwt = require('jsonwebtoken');
var config = require('../../config')
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
		    	// if everything is good, save to request for use in other routes
		    	req.decoded = decoded;      
		    	next();
		  	}
		});

	} else {
	    // if there is no token
	    return res.json({ success: false, message: 'No token provide.' });
 	}
}

function login(req,res,next){
	console.log("---> ");
	console.log(req.body.email);
	// find the user
	User.findOne({email: req.body.email}, function(err, user) {

		if (err) throw err;

		if (!user) {
		  res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			console.log("user"+user)
			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				// if user is found and password is right create a token with only our given payload
				const payload = {
				 	admin: user.admin,
				 	_id: user._id
				};

			    var token = jwt.sign(payload, config.secret);
			    console.log(token)
			    req.session.token = token;
			    return res.json({success: true, message: 'Authentication complete'});
		  	}   
		}
	});
}

var controller = {
	authentication:authentication,
	login: login
}

module.exports = controller