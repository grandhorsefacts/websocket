//this is the backend
/*we basically download
 things that become dependencies in
 package.json then we 'require' them here
 such as express and socket
 */
var express = require('express');//makes sure that we can use express in this file
var socket = require('socket.io');
//App setup
var app = express(); //invoke function

//created a server and stored it in variable below
var server = app.listen(4000,function(){//call back function let's us know it's listening to requests
  console.log('listening to requests on port 4000');
});//listen to specific port number

//Static files
/*
function below is what serves html to browser
*/
app.use(express.static('public'));//serves static files to port

//socket set up
/*
here we are passing in server function into socket
to set up socket on server-side
*/
var io = socket(server);//socket.io waits for the client is waiting for a connection

//we can make a connection and then pass a call back function
//that fires when the connection is made
/*
1)so we listen out for this connection based on above method (io variable)
2)then fire call back function
3)...which then passes through the socket
     between the client that's making the connection and the server
4) we can do stuff with the socker object later on...
*/
io.on('connection', function(socket){//curly braces are when parameter is passing in object
  console.log('made socket connection', socket.id);

  //Handle chat event
  socket.on('chat', function(data){//take in data object that we sent and sending it back out
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
});
