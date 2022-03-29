import React from 'react';
import './keyboard.css';
import BackspaceIcon from '@mui/icons-material/Backspace';
import EventBus from './eventbus';

const rows = [
    'qwertyuiop'.split(''),
    'asdfghjkl'.split(''),
    ['Enter', 
    ...'zxcvbnm'.split(''),
     'Backspace']
  ];

//one button of the keyboard
class KeyboardButton extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			keyboard_key:props.keyboard_key,
		};
	}

    //emit the event of Class Game "CustomKeyDown"
    clickBtn(key){
        EventBus.dispatch("CustomKeyDown", { key: key });
    }

    render(){
        let child;
        let keyboardClass = "keyboard-btn";
        if(this.props.keyboard_key == 'Backspace'){
            child = <BackspaceIcon />;
            keyboardClass += " big";
        }else if(this.props.keyboard_key == 'Enter'){
            child = <span>{ this.props.keyboard_key }</span>;
            keyboardClass += " big";
        }else{
            child = <span>{ this.props.keyboard_key }</span>;
        }
        
        return(
            <button value={this.props.keyboard_key} className={keyboardClass} 
             onClick={e => this.clickBtn(e.currentTarget.value)}>
                {child}
            </button>
        );
        
    }
}

export default class Keyboard extends React.Component {

    render(){
        let keyboard = [];

        for(var i = 0; i < rows.length;i++){
            let keyboard_rows = [];
            for(var j = 0;j < rows[i].length;j++){
                //console.log("rows[i][j]",rows[i][j]);
                keyboard_rows.push(
                    <KeyboardButton key={i*5+j}  keyboard_key={rows[i][j]} />
                );
            }
            if(i == 1){
                keyboard_rows.push(
                    <div className="spacer" key={'spacestart'}></div>
                );
                keyboard_rows.unshift(
                    <div className="spacer" key={'spaceend'}></div>
                );
            }
            keyboard.push(
                <div className="keyboard-row" key={'row'+i}>
                    {keyboard_rows}
                </div>
            );
        }
        
        return(
            <div id="keyboard-container">
                <div id="keyboard">
                    {keyboard}
                </div>
            </div>
            
        );
    }

}



