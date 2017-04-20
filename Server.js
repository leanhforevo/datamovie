const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

var countClient = 0;
var roomis = '';
io.on("connection", function (socket) {
    countClient++;
    console.log('Co Nguoi Ket noi:' + socket.id)
    socket.emit('numberRoom', { room: 1, data: 'data' })

    socket.on('message', function (data) {
        console.log('Message from Client:' , data)
        // io.sockets.emit('messagerere', data)
        io.sockets.in(data.room).emit('messagerere', data);
    })
    
    socket.on('conn', function (data) {
        console.log('Message from Client:', data.room)
        // io.sockets.emit('message-re', data)
        socket.join(data.room);
        roomis = data.room;
    })

    socket.on('leaveRoom', function (data) {
        console.log('Client leave Room:', data)
        socket.leave(data);
    })
    
});

