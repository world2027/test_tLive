const http = require('http');
const socketIo = require('socket.io');

const port = 4000;
const server = http.createServer();
const io = socketIo(server , {
    cors :{
        origin: 'http://localhost',
    }
});

io.on('connection',(socket)=>{
    console.log("New Client Connected");

    socket.on('offer',(data)=>{
        socket.broadcast.emit('offer',data);
    });
    socket.on('answer', (data) => {
        socket.broadcast.emit('answer', data);
    });
    socket.on('candidate', (data) => {
        socket.broadcast.emit('candidate', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port,()=>{
    console.log("[+] RTC Server open on 4000");
})