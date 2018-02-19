'use strict'
var express = require('express');
var controller = require('./authentication.controller.js');

var router = express.Router();

router.post('/login',controller.login);

module.exports = router;