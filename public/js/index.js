// this file is client side javascript 
// making request from client to the server to open up web socket and keep connection open, listen to the data from server and send data to the server
var socket = io();

socket.on("connect", function(){
   console.log("connected to server");
   
   // event is emitted from client to server, server got data
//   socket.emit('createEmail', {
//	   to: "jem@example.com",
//	   text: "hey this is Andrew"
//   });
	
	
	// first argument is event, second argument is data
//	socket.emit('createMessage', {
//		from: "Mike",
//		text: "That works for me"
//		
//	})
	

});
	   
// fires the event whenever the connection drops
socket.on('disconnect', function(){
   console.log("disconnected from server");
});

socket.on("newMessage", function(newMessage){
	console.log("newMessage", newMessage);
	var li = jQuery('<li></li>');
	li.text(newMessage.from + ":" + newMessage.text);
	$("#messages").append(li);
});

//socket.emit("createMessage", {
//	from: "Frank",
//	text: "Hi"
//	// function to be executed when acknowledgement has been sent from server to the client
//}, function(data){
//	// our data went successfully from client to the server
//	console.log("got it", data);
//});
// custom event, function will execute when event happens
socket.on('newEmail', function(email){
	console.log("new Email", email);
});

$("#message-form").on("submit", function(e){
	// prevent default behavior for the event
	e.preventDefault();
	
	socket.emit("createMessage", {
		from: 'User',
		text: jQuery('[name = message]').val()
	}, function(){
		
	});
});

	