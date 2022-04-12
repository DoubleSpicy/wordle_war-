import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../game.css';
import Keyboard from '../keyboard';
import EventBus from '../eventbus';
import AllWords from '../word';
import CircularProgress from '@mui/material/CircularProgress';
import Server from './mserver';
import ChatIcon from '@mui/icons-material/Chat';
import Fab from '@mui/material/Fab';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import useRefreshToken from '../../hooks/useRefreshToken';
import AuthContext from '../../context/AuthProvider';
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation  } from "react-router-dom";

//call it using <Game />

//one of 6*5 box
class Block extends React.Component {
    render() {
        var filled = (this.props.isFilled) ? ' filled' : '';
        var revealed = (this.props.isRevealed) ? ' revealed' : '';
        return (
            <div className={"block " + filled + revealed}>
                <div className="front">
                    {this.props.letter}
                </div>
                <div className={'back ' + this.props.state}>
                    {this.props.letter}
                </div>
            </div>
        );
    }
}

//Whole game
class MultiGame extends React.Component {

    constructor(props) {
        super(props);

        //it should be modify by not-fixed data
        this.state = {
            keyword: this.props.keyword,
            current_row: 0,
            current_index: 0,
            letter_count: this.props.keyword.length,
            row_count: 6,
            userfill: null,
            opponent:{
                current_row: 0,
                userfill:null
            },
            game_state: this.props.game_state,
            popup:'',
            isChatroomShow:false
        };
        this.toggleChatRoom = this.toggleChatRoom.bind(this);
        //this.setState({keyword:props.word,letter_count:props.word.length});
        
        

        //inital the 6*5 game board with null
        this.state.userfill = Array(this.state.row_count).fill(null);
        for (var j = 0; j < this.state.row_count; j++) {
            this.state.userfill[j] = Array(this.state.letter_count).fill({
                letter: undefined,
                state: ''
            });
        }
        this.state.opponent.userfill = Array(this.state.row_count).fill(null);
        for (var j = 0; j < this.state.row_count; j++) {
            this.state.opponent.userfill[j] = Array(this.state.letter_count).fill({
                letter: undefined,
                state: ''
            });
        }
        Server.receiveOpponentState();
        EventBus.on('opponentState',(word)=>{
            console.log('Eventbus opponentState');
            this.opponentChange(word);
        });


        //recevice the keyboard keydown to play game
        EventBus.on("CustomKeyDown", (data) => {
            //console.log("CustomKeyDown",data);
            if (data) {
                if (data.key == 'Backspace') {
                    if (this.state.current_index > 0) {
                        this.state.current_index--;
                        this.updateBlock(this.state.current_row, this.state.current_index, undefined, '');
                    }

                } else if (data.key == 'Enter') {
                    if (this.state.current_index >= this.state.letter_count) {

                        if (AllWords.includes(this.getFullWordOfRow(this.state.current_row))) {
                            this.checkMatchKeyword();
                        } else {
                            this.showPopup("The word is not in word list");
                            console.log("The word is not in word list");
                        }

                    } else {
                        this.showPopup("The block is not full-filled");
                        console.log("The block is not full-filled");
                    }
                } else {
                    if (this.state.current_index <= this.state.letter_count - 1) {
                        this.updateBlock(this.state.current_row, this.state.current_index, data.key, '');
                        this.state.current_index++;
                    }
                    //console.log("current index: "+this.state.current_index+", row: "+ this.state.current_row);
                }
            } else {
                console.log("data is undefined");
            }

        });

    }
    //update one block letter and state using row and col
    updateBlock(row, col, letter, state) {
        console.log("updateBlock(" + row + "," + col + ") to " + letter);
        const fill = this.state.userfill.slice();
        fill[row][col] = {
            letter: letter,
            state: state
        };
        this.setState({ userfill: fill });
    }

    //update one block letter and state using row and col
    updateopponentBlock(row, col, letter, state) {
        console.log("updateBlock(" + row + "," + col + ") to " + letter);
        const fill = this.state.opponent.userfill.slice();
        fill[row][col] = {
            letter: letter,
            state: state
        };
        this.state.opponent.userfill = fill;
        this.setState({ opponent: this.state.opponent });
    }

    //check one row is not match the answer
    checkMatchKeyword() {
        let row_index = this.state.current_row;
        Server.submitWords(this.getFullWordOfRow(this.state.current_row),row_index);
        this.state.current_row++;
        this.state.current_index = 0;
        let target_row = this.state.userfill[row_index];

        var correct = 0;
        for (var i = 0; i < this.state.letter_count; i++) {
            console.log(target_row[i].letter + "|" + this.state.keyword.charAt(i));
            if (target_row[i].letter == this.state.keyword.charAt(i)) {
                correct++;
                this.updateBlock(row_index, i, target_row[i].letter, 'correct');
            } else if (this.state.keyword.includes(target_row[i].letter)) {
                this.updateBlock(row_index, i, target_row[i].letter, 'present');
            } else {
                this.updateBlock(row_index, i, target_row[i].letter, 'absent');
            }
        }
        if(correct >= 5){
            this.props.resultdef(this.getResult(this.state.userfill),
                this.getResult(this.state.opponent.userfill));
                setTimeout(()=>{
                    this.props.gamestatedef(1);
                },1500);
            //this.props.gamestatedef(true);
        }else if(this.state.current_row >= this.state.row_count){
            if(!this.checkTie()){
                this.showPopup("All Chances are used");
            }
            
        }
        
    }

    //get the word of one row
    getFullWordOfRow(row) {
        let word = '';
        for (var i = 0; i < this.state.letter_count; i++) {
            word += this.state.userfill[row][i].letter;
        }
        return word;
    }

    opponentChange(data){
        console.log('opponentChange',data)
        let row_index = data.row;
        if(data.row == this.state.opponent.current_row){
            this.state.opponent.current_row++;
            var correct = 0;
            for (var i = 0; i < data.word.length; i++) {
                //console.log(data.word);
                if (data.word.charAt(i) == this.state.keyword.charAt(i)) {
                    correct++;
                    this.updateopponentBlock(row_index, i, undefined, 'correct');
                } else if (this.state.keyword.includes(data.word.charAt(i))) {
                    this.updateopponentBlock(row_index, i, undefined, 'present');
                } else {
                    this.updateopponentBlock(row_index, i, undefined, 'absent');
                }
            }
            if(correct >= 5){
                //alert("opponent wins");
                this.props.resultdef(this.getResult(this.state.userfill),
                    this.getResult(this.state.opponent.userfill));
                setTimeout(()=>{
                    this.props.gamestatedef(-1);
                },1500);
                //this.props.game_state = -1;
            }
            if(this.state.opponent.current_row >= this.state.row_count){
                if(!this.checkTie()){
                    this.showPopup("Your opponent use all chances. Hurry up!");
                }else{
                    this.props.resultdef(this.getResult(this.state.userfill),
                    this.getResult(this.state.opponent.userfill));
                    setTimeout(()=>{
                        this.props.gamestatedef(0);
                    },1500);
                }
                
            }
        }else{
            console.log('duplicate');
        }
        
    }

    showPopup(msg){
        this.setState({popup:msg});
        setTimeout(()=>{
            this.setState({popup:''});
        },1500);
    }

    checkTie(){
        if(this.state.opponent.current_row >= this.state.row_count &&
            this.state.current_row  >= this.state.row_count){
            this.showPopup("Game Tie!");
            this.props.resultdef(this.getResult(this.state.userfill),
            this.getResult(this.state.opponent.userfill));
            setTimeout(()=>{
                this.props.gamestatedef(2);
            },1500);
            
            return true;
        }else{
            return false;
        }
    }

    
    getResult(board){
        console.log("getResult",board);
        var result = '';
        for(var i = 0;i < this.state.row_count;i++){
            for(var j = 0;j < this.state.letter_count;j++){
                if(board[i][j].state == 'correct'){
                    result += "🟩";
                }else if(board[i][j].state == 'present'){
                    result += "🟨";
                }else if(board[i][j].state == 'absent'){
                    result += "⬜";
                }
            }
            result+="\n";
        }
        //console.log(result);
        return result;
    }

    toggleChatRoom(){
        this.setState({isChatroomShow : !this.state.isChatroomShow});
        
    }
 

    render() {

        let blocks = [];
        for (var i = 0; i < this.state.row_count; i++) {
            let blocks_row = [];
            for (var j = 0; j < this.state.letter_count; j++) {
                blocks_row.push(
                    <Block key={i * this.state.letter_count + j + ''}
                        letter={this.state.userfill[i][j].letter}
                        state={this.state.userfill[i][j].state}
                        isFilled={(this.state.userfill[i][j].letter != undefined)}
                        isRevealed={(this.state.userfill[i][j].state != '')}
                    />
                );

            }
            blocks.push(
                <div className="row" key={'row' + i}>
                    {blocks_row}
                </div>
            );
        }


        let otherBlocks = [];
        for (var i = 0; i < this.state.row_count; i++) {
            let other_blocks_row = [];
            for (var j = 0; j < this.state.letter_count; j++) {
                other_blocks_row.push(
                    <Block key={i * this.state.letter_count + j + ''}
                        letter={this.state.opponent.userfill[i][j].letter}
                        state={this.state.opponent.userfill[i][j].state}
                        isFilled={(this.state.opponent.userfill[i][j].letter != undefined)}
                        isRevealed={(this.state.opponent.userfill[i][j].state != '')}
                    />
                );

            }
            otherBlocks.push(
                <div className="row" key={'row' + i}>
                    {other_blocks_row}
                </div>
            );
        }

        return (
            <div id="game-container">
                <div id="board-container">
                    <div id="board">
                        {blocks}
                    </div>
                    <div id="opponent-border">
                        <div id="opponent">
                            {otherBlocks}
                        </div>
                        Opponent's
                    </div>
                </div>
                <Keyboard game={this} />
                

                <div className='popup-msg'>
                    {this.state.popup}
                </div>
            </div>

        );
    }
}
/*<div className='chatroom-btn'>
    <Fab onClick={this.toggleChatRoom}>
        <ChatIcon />
    </Fab>
</div>

{this.state.isChatroomShow && <div className='popup-chatroom'>
    <div className='chatroom-header'>CHATROOM</div>
    
    <div className='opponent-chat'>
        <div className='chat'>hi loser</div>
    </div>
    <div className='opponent-chat'>
        <div className='chat'>hihi\nloser</div>
    </div>
    <div className='player-chat'>
        <div className='chat'>you you you you</div>
    </div>
    <div className='opponent-chat'>
        <div className='chat'>just
        child</div>
    </div>
    <div className='chat-input'>
        <input type="text"></input>
        <button>Submit</button>
    </div>
</div>}<br/>*/


class Room extends React.Component {

	constructor(props) {
		super(props);
		//it should be modify by not-fixed data
		this.state = {
			loading:true,
            opponent:undefined,
            keyword:undefined,
            game_state:0, // 0: game is running, 1: player win,-1:opponent win,2: tile
            result:{
                player: undefined,
                opponent: undefined
            },
            rating:{
                oldR:1500,
                newR:1500
            }
		};
        this.updateGameState = this.updateGameState.bind(this);
        this.updateResult = this.updateResult.bind(this);

        
	}
    componentDidMount(){
        Server.waitRoom(this.props.auth.userid,((data)=>{
            console.log('(waitRoom):',data);
            this.state.opponent = data.opponentId;
            this.state.keyword = data.word;
            this.setState({keyword:data.word});
            this.setState({opponent:data.opponentId});
            this.setState({loading:false});
        }));
    }

    updateResult(playerResult,opponentResult){
        this.state.result = {player:playerResult,opponent:opponentResult};
        console.log("this.state.result",this.state.result);
        this.setState({result:this.state.result});
    }

    updateGameState(state){
        if(this.state.game_state == 0){
            this.setState({game_state:state});
            var old = parseFloat(this.props.auth.rating).toFixed(1);
            Server.submitResult(this.props.auth.userid,state,this.props.updateauthref).then(()=>{
                this.setState({
                    rating:{
                        oldR:old,
                        newR:parseFloat(this.props.auth.rating).toFixed(1)
                    }
                });
                console.log(this.state.rating);
            });
            
        }
    }

    


	render() {
		return (
			<div>
				{(this.state.loading || this.state.keyword == undefined) && <div className='loading'>
                        Prepare Room
                        <CircularProgress />
                    </div>}
				{(!this.state.loading && this.state.keyword != undefined) && 
                <MultiGame resultdef={this.updateResult} 
                    gamestatedef={this.updateGameState} 
                    keyword={this.state.keyword}/> }
                
                {this.state.game_state != 0 && <div className='layer'>
                    <div className='dialog'>
                        {this.state.game_state == 1 && "You Win!"}
                        {this.state.game_state == -1 && "You Lose!"}
                        {this.state.game_state == 2 && "Tie!"}
                        <br/>
                        Your rating: {this.state.rating.oldR} → {this.state.rating.newR}<br/>
                        Answer: {this.state.keyword}<br/>
                        Player Result<br/>
                        {this.state.result.player}
                        Opponent Result<br/>
                        {this.state.result.opponent}
                        <Link to={this.props.leaveref}>EXIT</Link>
                    </div>
                </div>}
			</div>
		);
	}
}

const GameRoom = ()=>{
    const { auth,setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    console.log(auth);
    console.log('from:',from);
    const updateAuth = (rating,wincount,losecount)=>{
        var copy = JSON.parse(JSON.stringify(auth))
        copy.rating = rating;
        copy.wincount = wincount;
        copy.losecount = losecount;
        setAuth(copy);
    }
    return <Room auth={auth} leaveref={from} updateauthref={updateAuth}/>
}

export default GameRoom;