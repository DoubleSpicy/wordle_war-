class Server {
	
	constructor() {
		const server = require('http').createServer();
		const options = { cors:true,
		 origins:["http://127.0.0.1:3000"]};
		const io = require('socket.io')(server, options);

		this.onlineplayers = {};

		io.on('connection', socket => {
			//經過連線後在 console 中印出訊息
			console.log('user in')
			//監聽透過 connection 傳進來的事件
			socket.on('getMessage', message => {
				//回傳 message 給發送訊息的 Client
				console.log('received2: '+message);
				socket.emit('getMessage', message)
			});
			
			socket.on('playGame', message => {
				//回傳 message 給發送訊息的 Client
				console.log('A player start game');
				console.log('received2: '+message);
				this.onlineplayers[this.onlineplayers.length] = (message);
				console.log('player: '+this.onlineplayers);
				socket.emit('getMessage', message)
			});
			
			socket.on('disconnect', () => {
				console.log("A player disconnect");
            });
		});

		server.listen(4000, () => {
		  console.log('listening on *:4000');
		});
	}
	
	checkOnlinePlayers(){
		return (this.onlineplayers.length > 1);
	}
	
	createRoom(currentPlayer){
		
	}
}

let main = () => {
    let server = new Server();
};

main();