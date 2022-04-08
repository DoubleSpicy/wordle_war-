const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const app = express()

const server = http.createServer(app)
const io = socketio(server)

// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects

io.on('connection', client => {
    gameLogic.initializeGame(io, client)
})

// usually this is where we try to connect to our DB.
server.listen(process.env.PORT || 3500)