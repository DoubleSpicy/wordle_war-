// https://github.com/Jerga99/next-youtube-course
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;


const socketPORT = process.env.PORT+1000 || 4500;
const answers = require('./word');


// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.get('/test', (req, res) => {
    res.json({ message: 'Hello World!' });
})

app.use('/login', require('./routes/login'));
app.use('/activate', require('./routes/activate'));
app.use('/resetPassword', require('./routes/reset-password'));
app.use('/resetPassword/confirmation', require('./routes/resetPasswordConfirmation'));

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));


app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));
app.use('/testEmail', require('./routes/testEmail'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

class Server {

    constructor() {
        const server = require('http').createServer();
        const options = { cors:true,
        origins:"*"};
        const io = require('socket.io')(server,options);
        this.io = io;
        this.onlineplayers = [];

        io.on('connection', socket => {

            console.log('user in',socket.id)
            socket.on('waitRoom', id => {
                console.log('(waitRoom): '+socket.id);
                if(!this.onlineplayers.includes(socket.id)){
                    if(this.onlineplayers.length > 0){
                        var opponent = this.onlineplayers.pop();
                        console.log("New Game Room: "+socket.io+'|'+opponent);
                        //var answers = require('./word').;
                        console.log('answers',answers);
                        var answer = answers[Math.floor(Math.random() * answers.length)];
                        console.log("keyword: "+answer);
                        io.to(opponent).emit('gameRoom', {word:answer,opponentId:socket.id});
                        socket.emit('gameRoom', {word:answer,opponentId:opponent});

                        var opponentSocket = io.sockets.sockets.get(opponent);

                        /*socket.on('exitRoom',(data)=>{
                            console.log('(exitRoom) one of player exit room,',socket.id);
                            socket.removeAllListeners('submitWord');
                            io.to(opponent).emit('opponentExitRoom',{});
                        });*/
                        socket.on('submitWord',(data)=>{
                            console.log('(submitWord)',data);
                            io.to(opponent).emit('opponentState',{row:data.row,word:data.word});
                            
                        });
                        /*opponentSocket.on('exitRoom',(data)=>{
                            console.log('(exitRoom) one of player exit room,',opponent);
                            opponentSocket.removeAllListeners('submitWord');
                            socket.emit('opponentExitRoom',{});
                        });*/
                        opponentSocket.on('submitWord',(data)=>{
                            console.log('(submitWord)',data);
                            socket.emit('opponentState',{row:data.row,word:data.word});
                        });

                    }else{
                        this.onlineplayers.push(socket.id);
                    }
                    socket.once('closeWaitRoom',(data)=>{
                        console.log('(closeWaitRoom)',data);
                        console.log("A player leave waiting room:"+socket.id);
                        delete this.onlineplayers.pop(socket.id);
                        
                    });
                }else{
                    console.log('(waitRoom): user exist: '+socket.id);
                }

                //socket.emit('gameRoom', 'abs');
            });

            socket.on('disconnect', () => {
                console.log("A player disconnect:"+socket.id);
                delete this.onlineplayers.pop(socket.id);
                //socket.emit('exitRoom');
            });


        });

        server.listen(socketPORT, () => {
            console.log('(socket)listening on *:'+socketPORT);
        });

    }

}

let main = () => {
    let server = new Server();
};

main(); 