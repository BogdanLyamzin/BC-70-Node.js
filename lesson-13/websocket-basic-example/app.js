import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({port: 5000});

const socketList = [];

wsServer.on("connection", (socket)=> {
    // console.log("New frontend connected");
    setTimeout(()=> socket.send("Welcome to server"), 3000);
    // setTimeout(()=> socket.close(1000, "Server need restart"), 5000);
    socket.on("close", (code, reason)=> {
        console.log(code);
        console.log(reason.toString());
        const index = socketList.findIndex(item => item === socket);
        socketList.splice(index, 1);
    });
    socketList.forEach(item => item.send(`We have ${socketList.length + 1} member`));
    socketList.push(socket);
})