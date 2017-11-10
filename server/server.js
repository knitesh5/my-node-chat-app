const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
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

  	socket.emit('newMessage',generateMessage('Admin','Welcome to the chet app'));

  	socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
 

  	 socket.on('createMessage',(message,callback)=>{
      console.log('createMessage',message);
      io.emit('newMessage',generateMessage(message.from,message.text));
      callback('This is from the server....');
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