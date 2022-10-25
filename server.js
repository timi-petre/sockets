const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

console.log('My socket server is running on port 3000');

const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection' + socket.id);
    socket.on('mouse', mouseMsg);
    socket.on('mouse', resetMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        //io.sockets.emit('mouse',data);
        console.log(data);
    }
    function resetMsg(nodata) {
        socket.broadcast.emit('mouse', nodata);
        console.log(nodata);
    }
}
