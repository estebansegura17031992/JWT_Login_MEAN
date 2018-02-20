var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cookieSession = require('cookie-session');
var morgan = require('morgan');


var config = require('./config');

app.use(express.static(__dirname + '/public'));

app.use(cookieSession({
	name: "session",
	keys: ["token"]
}));

//MORGAN USE FOR SEE BEAUTY REQUEST FOR THE SERVER
app.use(morgan('dev'));

//BODY PARSER: MIDLEWARE USING FOR HANDLING BODY REQUEST
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CONFIGURE OUR APPLICATION
var port = process.env.PORT || 3000; 
mongoose.connect(config.database); 

app.use('/api/authentication', require('./api/authentication/authentication.routes'));

app.listen(port,function(){
	console.log("Application running in port: "+port);
})