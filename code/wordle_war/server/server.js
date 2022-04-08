// https://github.com/Jerga99/next-youtube-course
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;
const socketPORT = process.env.PORT+1 || 3501;
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./controllers/mailer');
const answers = require('./word');

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

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
                console.log('(waitRoom): '+id);
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
                        //socket.off('waitRoom',waitRoom);
                    }else{
                        this.onlineplayers.push(socket.id);
                    }
                    socket.on('submitWord',(data)=>{
                        console.log('submitWord',data);
                        io.to(data.opponentId).emit('opponentState',{row:data.row,word:data.word});
                    });
                }else{
                    console.log('(waitRoom): user exist: '+socket.id);
                }
                
                //socket.emit('gameRoom', 'abs');
            });

            socket.on('disconnect', () => {
                console.log("A player disconnect:"+socket.id);
                delete this.onlineplayers.pop(socket.id);
            });

            
        });

        server.listen(socketPORT, () => {
            console.log('(socket)listening on *:'+socketPORT);
        });

    }

    /*getCurrentWaitingPlayers(onlineplayers){
        if(onlineplayers != null){
            console.log("getCurrentWaitingPlayers():"+onlineplayers.length);
            for(var i = 0;i < onlineplayers.length;i++){
                console.log(i+':'+onlineplayers[i]);
            }
        }
        
    }

    
    createRoom(io){
        if(this.onlineplayers.length > 1){
            io.to(this.onlineplayers[0]).emit('gameRoom', 'get Game Room');
            io.to(this.onlineplayers[1]).emit('gameRoom', 'get Game Room');
            delete this.onlineplayers[1];
            delete this.onlineplayers[0];
            this.getCurrentWaitingPlayers();
        }
        
    }*/

}

let main = () => {
    let server = new Server();
};

main();