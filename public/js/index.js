var socket = io('http://localhost:3000'); 
		socket.on('connect', function(){
			console.log('connected to server');
		

		socket.emit('createMessage',{
			from : 'nitesh',
			text : 'hey  m here'
		});
	});
  	
  		socket.on('disconnect',function(){
  			console.log('disconnected from server');
  		});

  		socket.on('newMessage',function(message){
  			console.log('newMessage',message);
  		});
