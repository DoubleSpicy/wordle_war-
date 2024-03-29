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

app.use('/admin', require('./routes/admin')); //ok
// built-in middleware for json 
app.use(express.json());
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));



//middleware for cookies
app.use(cookieParser());


//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.get('/test', (req, res) => {
    res.json({ message: 'Hello World!' });
})

app.use('/login', require('./routes/login')); //ok
app.use('/activate', require('./routes/activate'));  //ok
app.use('/resetPassword', require('./routes/reset-password')); //ok
app.use('/resetPassword/confirmation', require('./routes/resetPasswordConfirmation')); //ok

app.use('/register', require('./routes/register')); //ok
app.use('/auth', require('./routes/auth')); // ok
app.use('/refresh', require('./routes/refresh')); // ok
app.use('/logout', require('./routes/logout')); //ok
app.use('/userChangePassword', require('./routes/userChangePassword'));//ok
app.use('/adminChangePassword', require('./routes/adminChangePassword')); 
app.use('/testEmail', require('./routes/testEmail')); // ok
app.use('/game', require('./routes/api/game'));

app.use(verifyJWT); // cannot del 
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));



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
            socket.on('waitRoom', data => {
                console.log('(waitRoom): '+socket.id);
                if(!this.onlineplayers.filter(p => p.socketid == socket.id).length > 0){
                    if(this.onlineplayers.length > 0){
                        var opponent = this.onlineplayers.pop();
                        console.log("Now online: ",this.onlineplayers);
                        console.log("New Game Room: "+socket.id+'|'+opponent.socketid);

                        var player_keyword;
                        if(data.keyword == undefined){
                            //get answers from random
                            player_keyword = answers[Math.floor(Math.random() * answers.length)];
                            console.log('player answers',player_keyword);
                        }else{
                            player_keyword = data.keyword;
                            console.log('player answers (rating)',player_keyword);
                        }
                        var opponent_keyword;
                        if(opponent.keyword == undefined){
                            //get answers from random
                            opponent_keyword = answers[Math.floor(Math.random() * answers.length)];
                            console.log('opponent answers',opponent_keyword);
                        }else{
                            opponent_keyword = opponent.keyword;
                            console.log('opponent answers (rating)',opponent_keyword);
                        }
                        


                        io.to(opponent.socketid).emit('gameRoom', {
                            word:opponent_keyword.words,
                            opponent:{
                                socketid:socket.id,
                                rating:data.rating
                            }
                        });
                        socket.emit('gameRoom', {
                            word:player_keyword.words,
                            opponent:{
                                socketid:opponent.socketid,
                                rating:opponent.rating
                            }
                        });


                        var opponentSocket = io.sockets.sockets.get(opponent.socketid);

                        socket.on('submitWord',(data)=>{
                            console.log('(submitWord)',data);
                            io.to(opponent.socketid).emit('opponentState',{row:data.row,word:data.word,board:data.board});
                            
                        });
                        opponentSocket.on('submitWord',(data)=>{
                            console.log('(submitWord)',data);
                            socket.emit('opponentState',{row:data.row,word:data.word,board:data.board});
                        });

                        /*socket.on('submitResult',(data)=>{
                            console.log('(submitResult)',data);
                            
                        });
                        opponentSocket.on('submitResult',(data)=>{
                            console.log('(submitResult)',data);
                        });*/
                        
                        
                        /*socket.on('chat',(data)=>{
                            console.log('(chat) player('+socket.id+'):',data.msg);
                            io.to(opponent.socketid).emit('receivedChat',data.msg);
                            
                        });*/
                        /*opponentSocket.on('chat',(data)=>{
                            console.log('(chat) player('+opponent.socketid+'):',data.msg);
                            socket.emit('opponentState',{row:data.row,word:data.word});
                        });*/

                    }else{
                        this.onlineplayers.push({
                            socketid:socket.id,
                            userid:data.userid,
                            keyword:data.keyword,
                            rating:data.rating
                        });
                        console.log("Now online: ",this.onlineplayers);
                    }
                    socket.on('cleanServer',(data)=>{
                        socket.removeAllListeners("submitWord");
                        socket.removeAllListeners("submitResult");
                        delete this.onlineplayers.pop(this.onlineplayers.filter(p => p.socketid == socket.id)[0]);
                        socket.removeAllListeners('cleanServer');
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