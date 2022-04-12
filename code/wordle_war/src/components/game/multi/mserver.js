
import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import {io} from 'socket.io-client';
import EventBus from '../eventbus';
import axios from '../../../api/axios';
import useAuth from "../../hooks/useAuth";
const URL = 'http://localhost:4500'

//connect
const socket = io(URL);
// register preliminary event listeners here:


/*socket.on("createNewGame", statusUpdate => {
    console.log("A new game has been created!");
    //mySocketId = statusUpdate.mySocketId
})*/

const Server = {
    async waitRoom(auth,def){
        console.log('(waitRoom)');
        this.opponentId = null;
        this.rating = null;
        this.wordrating = null;
        this.opponentrating = null;
        try {
            const response = await axios.get('/game/'+auth,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("response",response);
            console.log("response.keyword",response.data.keyword);
            this.wordrating = response.data.wordrating || 1501;
            this.rating = response.data.rating|| 1501;
            socket.emit('waitRoom', {
                userid:auth.userid,
                keyword:response.data.keyword,
                rating:response.data.rating
            });
            
        } catch (err) {
            console.log("get player data fail",err);
            if(auth.userid){
                socket.emit('waitRoom', {userid:auth.userid});
            }
            
        }

        socket.off('gameRoom');
        socket.on('gameRoom', data => {
            console.log('(gameRoom): ',data);
            this.opponentId = data.opponent.socketid;
            this.opponentrating = data.opponent.rating || 1501;
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
        /*socket.on('opponentExitRoom',data => {
            console.log('opponentExitRoom');
            
        });*/
    },
    /*receiveChat(){
        socket.on('receivedChat',data => {
            this.chatList.push({sender:'opponent',msg:data});
        });
    },
    getChatList(){
        return this.chatList;
    },*/
    submitWords(word,row){
        socket.emit('submitWord', {row:row,word:word,opponentId:this.opponentId});
    },
    /*chat(msg){
        socket.emit('chat', {msg:msg,opponentId:this.opponentId});
    },*/
    async submitResult(auth,gameState,updateAuthRef){
        var rating = {
            userid:auth,
            gameState: gameState,
            rating: this.rating,
            wordrating: this.wordrating,
            opponentrating: this.opponentrating,
        };
        console.log("(submitResult)",rating);
        try {
            const response = await axios.post('/game/rating/update',
                JSON.stringify(rating),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("response",response);
            updateAuthRef(response.data.rating,response.data.wincount,response.data.losecount);
            
        } catch (err) {
            console.log("submitResult fail",err);
        }
    }
    /*suddenExitRoom(){

        socket.emit('exitRoom', {opponentId:this.opponentId});
    }*/
};


export default Server;
