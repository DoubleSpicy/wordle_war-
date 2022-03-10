const http= require('http');
const express = require("express");
const socketio = require("socket.io"); //intercept the request for socket.io.js & responds with the contents of the client side
const randomColor = require("randomcolor");
const createBoard = require("./create-Board");


const app = express();

app.use(express.static(`${__dirname}/..`));
const server = http.createServer(app);
const io = socketio(server);
const {clear, getBoard, makeTurn} = createBoard(20); //global board (since all the players are connecting to the same level)

//whenever a player is connected
io.on(`connection`,(sock) => { //sock communicates with specific client/its browser
    const color = randomColor();
    console.log(`someone connected with id:${sock.id}`);
    
    sock.emit("board",getBoard());//sock is a channel to run a single connected client
    //calling io.emit is sending to everyone including the client itself who has sent the original message(broadcast)
    sock.on("message",(text)=>io.emit(`message`, text));
    sock.on("turn",({cor,id})=>{
        makeTurn(cor.x,cor.y,color);
         io.emit("turn",{cor,color,id})
        });

});

server.on("error", (err)=> {
    console.error(err);
});

server.listen(8080, ()=> {
    console.log("server is ready");

});


