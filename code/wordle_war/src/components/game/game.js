import React from 'react';
import ReactDOM from 'react-dom';
import './game.css';
import Keyboard from './keyboard';
import EventBus from './eventbus';
import AllWords from './word';
import { Button } from '@mui/material';
import { answers } from './word';

//call it using <Game />

//one of 6*5 box
class Block extends React.Component {
	render(){
		var filled = (this.props.isFilled)? ' filled' : '';
		var revealed = (this.props.isRevealed)?' revealed':'';
		return(
			<div className={"block "+filled+revealed}>
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
export default class Game extends React.Component {

	constructor(props) {
		super(props);
		//it should be modify by not-fixed data
		this.state = {
			keyword: '',
			current_row:0,
			current_index:0,
			letter_count: ''.length,
			row_count:6,
			userfill: undefined,
			popup: '',
			game_state: 0,
			result: undefined
		};
		this.state.keyword = answers[Math.floor(Math.random() * answers.length)];
		console.log("this.state.keyword",this.state.keyword);
		this.state.letter_count = this.state.keyword.length;
		//inital the 6*5 game board with null
		this.state.userfill = Array(this.state.row_count).fill(null);
		for(var j = 0;j < this.state.row_count;j++){
			this.state.userfill[j] = Array(this.state.letter_count).fill({
				letter: undefined,
				state: ''
			});
		}
		
		//recevice the keyboard keydown to play game
		EventBus.on("CustomKeyDown", (data) =>{
			//console.log("CustomKeyDown",data);
			if(data){
				if(data.key == 'Backspace'){
					if(this.state.current_index > 0){
						this.state.current_index--;
						this.updateBlock(this.state.current_row,this.state.current_index,undefined,'');
					}
					
				}else if(data.key == 'Enter'){
					if(this.state.current_index >= this.state.letter_count){
						
						if(AllWords.includes(this.getFullWordOfRow(this.state.current_row))){
							this.checkMatchKeyword();
						}else{
							this.showPopup("The word is not in word list");
                            console.log("The word is not in word list");
						}
						
					}else{
						this.showPopup("The block is not full-filled");
                        console.log("The block is not full-filled");
					}
				}else{
					if(this.state.current_index <= this.state.letter_count - 1){
						this.updateBlock(this.state.current_row,this.state.current_index,data.key,'');
						this.state.current_index++;
					}
					//console.log("current index: "+this.state.current_index+", row: "+ this.state.current_row);
				}
			}else{
				console.log("data is undefined");
			}
			
		});

	}

	//update one block letter and state using row and col
	updateBlock(row,col,letter,state){
		console.log("updateBlock("+row+","+col+") to "+letter);
		const fill = this.state.userfill.slice();
		fill[row][col] = {
			letter: letter,
			state: state
		};
		this.setState({userfill:fill});
		
	}

	//check one row is not match the answer
	checkMatchKeyword(){
		let row_index = this.state.current_row;
		this.state.current_row++;
		this.state.current_index = 0;
		let target_row = this.state.userfill[row_index];
		var correct = 0;
		for(var i = 0;i < this.state.letter_count;i++){
			console.log(target_row[i].letter+"|"+this.state.keyword.charAt(i));
			if(target_row[i].letter == this.state.keyword.charAt(i)){
				correct++;
				this.updateBlock(row_index,i,target_row[i].letter,'correct');
			}else if(this.state.keyword.includes(target_row[i].letter)){
				this.updateBlock(row_index,i,target_row[i].letter,'present');
			}else{
				this.updateBlock(row_index,i,target_row[i].letter,'absent');
			}
		}
		if(correct >= 5){
			this.state.result = {player: this.getResult(this.state.userfill)};
			setTimeout(()=>{
				this.updateGameState(1);
			},1500);
        }else if(this.state.current_row >= this.state.row_count){
            this.showPopup("All Chances are used");
			this.state.result = {player: this.getResult(this.state.userfill)};
            setTimeout(()=>{
				this.updateGameState(-1);
			},1500);
        }
	}

	updateResult(playerResult,opponentResult){
        this.state.result = {player:playerResult,opponent:opponentResult};
        console.log("this.state.result",this.state.result);
        this.setState({result:this.state.result});
    }

    updateGameState(state){
        if(this.state.game_state == 0){
            this.setState({game_state:state});
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

	//get the word of one row
	getFullWordOfRow(row){
		let word = '';
		for(var i = 0;i < this.state.letter_count;i++){
			word += this.state.userfill[row][i].letter;
		}
		return word;
	}

	showPopup(msg){
        this.setState({popup:msg});
        setTimeout(()=>{
            this.setState({popup:''});
        },1500);
    }
	
	
  render() {

	let blocks = [];
	for(var i = 0;i < this.state.row_count;i++){
		let blocks_row = [];
		for(var j = 0;j < this.state.letter_count;j++){
			blocks_row.push(
				<Block key={i*this.state.letter_count+j+''} 
					letter={this.state.userfill[i][j].letter} 
					state={this.state.userfill[i][j].state}
					isFilled={(this.state.userfill[i][j].letter != undefined)}
					isRevealed={(this.state.userfill[i][j].state != '')}
				/>
			);
			
		}
		blocks.push(
			<div className="row" key={'row'+i}>
				{blocks_row}
			</div>
		);
	}
    return (
		<div id="game-container">
			<div id="board-container">
				<div id="board">
					{blocks}
				</div>
			</div>
			<Keyboard game={this}/>
			<div className='popup-msg'>
				{this.state.popup}
			</div>
			{this.state.game_state != 0 && <div className='layer'>
                    <div className='dialog'>
                        {this.state.game_state == 1 && "You Win!"}
                        {this.state.game_state == -1 && "You Lose!"}
                        {this.state.game_state == 2 && "Tie!"}
                        <br/>
                        Answer: {this.state.keyword}<br/>
                        Result<br/>
                        {this.state.result.player}
                        <Button href="/">exit</Button>
                    </div>
                </div>}
		</div>
    );
  }
}
