// server.js

var express = require('express');
var app = express();
var http = require('http').Server(app); 
var io = require('socket.io')(http);    

app.get('/',function(req, res){  
  res.sendFile(__dirname + '/client.html');
});

var count=1;
io.on('connection', function(socket){ 
  
  console.log('user connected: ', socket.id);  
  var name = ''; 

  console.log(socket.id);
              
  io.to(socket.id).emit('change name',name);   
  
  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name,text){ //3-3
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

http.listen(3000, function(){ //4
  console.log('server on!');
});