// root of our application, create express app, configure public directory, app.listen to start the server

const path = require('path');
// load express
const express = require('express');
// address passed to the express middleware
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));
app.listen(port, function(){
	console.log("server is up on ", port);
})
// displays current directory
//console.log(__dirname + "/../public");
//console.log(publicPath);