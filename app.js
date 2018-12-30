var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app); 
var port = 8081;

app.use(express.static(path.join(__dirname,"public")));

app.listen(port);