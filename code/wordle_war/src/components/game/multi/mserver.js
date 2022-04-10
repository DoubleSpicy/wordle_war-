
import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import {io} from 'socket.io-client';
import EventBus from '../eventbus';

const URL = 'http://localhost:4500'

//connect
const socket = io(URL);
// register preliminary event listeners here:


/*socket.on("createNewGame", statusUpdate => {
    console.log("A new game has been created!");
    //mySocketId = statusUpdate.mySocketId
})*/


const socketNewOrder = (order) => {
    return {
      type: 'SOCKET_NEW_ORDER',
      payload: order
    }
  }
const handlerFunc = (dispatch) => (order) => {
    dispatch(socketNewOrder(order));
}
  
  

const Server = {
    waitRoom(def){
        console.log('(waitRoom)');
        this.opponentId = null;
        socket.emit('waitRoom', '');
        socket.off('gameRoom');
        socket.on('gameRoom', data => {
            console.log('(gameRoom): ',data);
            this.opponentId = data.opponentId;
            def(data);
            socket.off('gameRoom');
            //socket.on('gameRoom', this.handlerFunc(dispatch));
        });
    },
    /*closeWaitRoom(){
        socket.emit('closeWaitRoom', '');
    },*/
    receiveOpponentState(){
        this.opponentRow = -1;
        this.chatList = [];
        socket.off('opponentState');
        console.log("receiveOpponentState()");
        socket.on('opponentState',data => {
            
            if(this.opponentRow < data.row){
                this.opponentRow = data.row;
                console.log('(opponentState): ',data);
                EventBus.dispatch('opponentState',data);
            }
            
        });
        socket.on('opponentExitRoom',data => {
            console.log('opponentExitRoom');
            
        });
    },
    receiveChat(){
        socket.on('receivedChat',data => {
            this.chatList.push({sender:'opponent',msg:data});
        });
    },
    getChatList(){
        return this.chatList;
    },
    submitWords(word,row){
        socket.emit('submitWord', {row:row,word:word,opponentId:this.opponentId});
    },
    chat(msg){
        socket.emit('chat', {msg:msg,opponentId:this.opponentId});
    }
    /*suddenExitRoom(){

        socket.emit('exitRoom', {opponentId:this.opponentId});
    }*/
};


export default Server;
