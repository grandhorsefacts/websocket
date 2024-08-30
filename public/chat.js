//Make connection
var socket = io.connect('http://localhost:4000');//socket for the front end
//when someone hits send, this does the heavy lifting to backend

//need handle, message, send, and output from html first
// Query
var message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

//emit events

btn.addEventListener('click', function(){
  socket.emit('chat',{//emit emits message (chat, which is identified by first parameter and is actually second parameter) down web socket to server
    message:message.value,//gets value of message Box
    handle: handle.value
  });
});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
})

//Listen for events from Server
socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message..</em></p>';
});
