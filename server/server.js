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
  		from: 'hit',
  		text: 'see you then',
  		createdAt : 123123
  	});

  	 socket.on('createMessage',(message)=>{
      console.log('createMessage',message);
  	 });

socket.on('disconnect',()=>{
	console.log('USer was disconnected');
});

});