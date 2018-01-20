const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const package = require('./package.json');
const config = require('./config.json');

let users = [];

console.log('[INFO] Starting' + package.name + ' version ' + package.version);
console.log('[INFO] Server starting on port ' + config.port);

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/game.html');
});

http.listen(config.port, function(){

    console.log('[INFO] The server "' + config.name + '" is working properly');

});

io.on('connection', function(socket){

    var address = socket.handshake.address;
    console.log('[INFO] ' + address + ' is trying to connect');

    console.log('[INFO] user connected');

    socket.on('disconnect', function(){

        console.log('[INFO] user disconnected');

    });
});