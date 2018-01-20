const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const package = require('./package.json');
const config = require('./config.json');

let sockets = [];
let players = [];

console.log('[INFO] Starting ' + package.name + ' version ' + package.version);
console.log('[INFO] Server starting on port ' + config.port);

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/game.html');
});

http.listen(config.port, function(){

    console.log('[INFO] The server "' + config.name + '" is working properly');

});

io.on('connection', function(socket){

    console.log(socket.id + ' wants to connect')

    socket.on('disconnect', function(){

        console.log(players);

        console.log(socket.id + ' disconnected');

        socket.broadcast.emit('response', 'Someone disconnected!');
        io.emit('players', players);

    });

    socket.on('username', function (username) {

        players.push({
            id: socket.id,
            username: username,
            hp: 1000
        });

        console.log(players);

        socket.emit('response', 'Welcome ' + username + '!');
        socket.broadcast.emit('response', username + ' joined!');
        io.emit('players', players);

    });

});