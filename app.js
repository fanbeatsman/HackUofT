// setup express application
var express = require('express');
var app = express();

// import server side javascript as module
var server = require('./server.js');

server.init();

// serve static files from public
app.use(express.static(__dirname + '/public'));
app.listen(3002);

// route handling
app.get("/blah", function (req, res ){
	// res.send("hello!");
	res.render('blah.html');
});







