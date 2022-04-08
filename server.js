
const http= require('http');
const express = require("express");
const socketio = require("socket.io");
const {request} = require("express"); //intercept the request for socket.io.js & responds with the contents of the client side
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,"views")));
io.on(`connection`, (socket) => {
    
    console.log(`someone connected  with id:${socket.id}`);
    socket.emit("welcome", "welcome");
    
})
io.of("/home").on(`connection`, (socket) => {
    
    console.log(`someone connected HOME joined with id:${socket.id}`);
    socket.emit("welcome", "welcome");
    
});

server.on("error", (err)=> {
    console.error(err);
});

server.listen(8080, ()=> {
    console.log("server is ready");

});