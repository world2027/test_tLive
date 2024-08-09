const http = require('http');
const socketIo = require('socket.io');

const port = 4000;
const server = http.createServer((req,res)=>{
    /*
    response.writeHead() : 응답에 대한 header를 작성하는 부분이다. 첫번째 매개변수는 응답코드이며, 두번째 매개변수로는 헤더에 들어갈 내용을 작성해준다.
    response.write() : 응답의 body를 작성하는 부분이다. 문자열을 보낼 수 도 있으며, 버퍼를 보낼 수도 있다.
    response.end() : 응답을 종료하는 메소드이다.만약 매개변수가 있다면, 해당 내용까지 body에 작성하고 응답을 종료한다. 없으면, 그냥 응답을 종료한다.
    listen() : listen메소드는 어떤 포트에 열게될 것인지와, 포트 연결이완료된 후 실행할 콜백함수를 작성한다.
    */
});
const io = socketIo(server,{
    cors: {
        //origin : "http://192.168.219.44",
        origin : "http://127.0.0.1",                  
        methods: ["GET", "POST"],
        //allowedHeaders: ["my-custom-header"],
        //credentials: true
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