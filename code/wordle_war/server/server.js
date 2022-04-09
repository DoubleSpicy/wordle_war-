// https://github.com/Jerga99/next-youtube-course
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;
const socketPORT = process.env.PORT+1 || 3501;
const answers = require('./word');
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./controllers/mailer');


const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


// // Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());



// routes
app.use('/', require('./routes/root'));
app.get('/test', (req, res) => {
    res.json({ message: 'Hello World!' });
})

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/activate', require('./routes/activate'));
app.use('/resetPassword', require('./routes/reset-password'));
app.use('/resetPassword/confirmation', require('./routes/resetPasswordConfirmation'));

app.use('/auth', require('./routes/auth'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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