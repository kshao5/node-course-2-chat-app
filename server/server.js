// root of our application, create express app, configure public directory, app.listen to start the server

const path = require('path');
const http = require('http');
// load express
const express = require('express');
const generateMessage = require('./utils/message');

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
	
	// creating the event, second argument is the data for the email, so that we can send custom data, data will be sent from server to the client
//	socket.emit('newEmail', {
//		from: "Mike@example.com",
//		text: "nice to meet you",
//		createAt: 123
//	});
	
//	socket.on('createEmail', function(newEmail){
//		console.log('createEmail', newEmail);
//	});
	
//	socket.emit('newMessage', {
//		from: "Admin",
//		text: "Welcome to the chat app"
//	});
//	
//	socket.broadcast.emit("newMessage", {
//		from: "Admin",
//		text: "User has joined"
//	});
	
	socket.emit("newMessage", generateMessage("Admin", "welcome to the chat app"));
	socket.broadcast.emit("newMessage", generateMessage("Admin", "new user joined"));
	
	// callback is the function to be executed when we acknowledge we got the request at client
	socket.on('createMessage', function(newMessage, callback){
		console.log("new message", newMessage);
		
		io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));
		// execute callback function in index.js
		callback("this is sent from server");
		// send new message to every body
//		io.emit("newMessage", {
//			from: newMessage.from,
//			text: newMessage.text,
//			createdAt: new Date().getTime()
//		});
		// send new message to everyone except for the sender
//		socket.broadcast.emit("newMessage", {
//			from: newMessage.from,
//			text: newMessage.text,
//			createdAt : new Date().getTime()
//		});
	});
	
//	socket.emit("newMessage", {
//		from: "Jonny",
//		text: "Where to eat today",
//		createdAt: 123123
//	});
	
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