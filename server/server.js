// root of our application, create express app, configure public directory, app.listen to start the server

const path = require('path');
const http = require('http');
// load express
const express = require('express');

const socketIO = require('socket.io');
// address passed to the express middleware
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

// use http server instead of express server
var server = http.createServer(app);
// what we get back is websocket server, communicate between server and client
var io = socketIO(server);

app.use(express.static(publicPath));

// let you register for an event, and do something when event happens, listen for a new connection and do something when connection comes in, when server went done, it tries to reconnect
io.on("connection" ,function(socket){
	// any time a user comes in, this message will be printed
	console.log("new user connected");
	socket.on("disconnect", function(){
		console.log("user is disconnected");
	});
});
server.listen(port, function(){
	console.log("server is up on ", port);
})

// displays current directory
//console.log(__dirname + "/../public");
//console.log(publicPath);