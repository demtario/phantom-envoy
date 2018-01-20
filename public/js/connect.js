let username;
let status = 0;

while(!username)
    username = prompt('Jak cię zwą?', 'jendrok');

let socket = io();

socket.emit('username', username);

socket.on('response', function (data) {
    console.log('[SERVER] ' + data);
});

socket.on('players', function (data) {
    console.log(data);
});