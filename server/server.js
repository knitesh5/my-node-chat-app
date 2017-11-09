const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app=express();


app.use(express.static(publicPath));


var server = app.listen(port,()=>{
	console.log(`Server is up on ${port}`);

});

var io  = require('socket.io').listen(server);


io.on('connection', function (socket) {
  	console.log('New user connected');

  	socket.emit('newMessage',{
  		from : 'Admin',
  		text : 'Welcome to the chet App',
  		createdAt: new Date().getTime()
  	});

  	socket.broadcast.emit('newMessage',{
  		from: 'Admin',
  		text: 'New user joined',
  		createdAt: new Date().getTime()
  	});
 

  	 socket.on('createMessage',(message)=>{
      console.log('createMessage',message);
      io.emit('newMessage',{
      	from: message.from,
      	text: message.text,
      	createdAt: new Date().getTime()
      });
      // socket.broadcast.emit('newMessage',{
      // 	from: message.from,
      // 	text: message.text,
      // 	createdAt: new Date().getTime()
      // });
  	 });

socket.on('disconnect',()=>{
	console.log('USer was disconnected');
});

});