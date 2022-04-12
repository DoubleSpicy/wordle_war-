const User = require('../model/User');
const Elo = require('./elo');
//import Elo from './elo';

//{player1 : player1id, player2 : player2id}
const getWordfromRating =  async (req, res) => {
    if (!req?.params?.player1) return res.status(400).json({ "message": 'Player1 ID required' });
    //if (!req?.params?.player2) return res.status(400).json({ "message": 'Player2 ID required' });
    const player1 = await User.findOne({ _id: req?.params?.player1 }).exec();
    if (!player1) {
        return res.status(204).json({ 'message': `User ID ${req.params.player1} not found` });
    }
    /*const player2 = await User.findOne({ _id: player2 }).exec();
    if (!player2) {
        return res.status(204).json({ 'message': `User ID ${req.params.player2} not found` });
    }*/
    console.log("getWordfromRating");
    var player1keyword = getWordByRating(player1.rating);
    console.log("player1keyword",player1keyword);
    //var player2keyword = getWordByRating(player2.rating);
    res.json({player: player1, keyword: player1keyword,rating: player1.rating,wordrating:player1keyword.difficulty});
    
}

/*var rating = {
    userid:auth,
    gameState: gameState,
    rating: this.rating,
    wordrating: this.wordrating,
    opponentrating: this.opponentrating,
};*/
const updateRating =  async (req, res) => {
    const { userid,gameState, rating,wordrating,opponentrating } = req.body;
    console.log(req.body);
    if (!userid) return res.status(400).json({ 'message': 'userid are required.' });
    if (!gameState || !rating || !wordrating || !opponentrating) return res.status(400).json({ 'message': 'Rating are required.' });
    var newrating = Elo.calcNewRating(gameState,rating, wordrating,opponentrating);
    const user = await User.findOne({ _id: userid }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    const filter = { id: userid };
    const update = { rating : newrating};
    if(gameState == 1){
        update["wincount"] = user.wincount+1;
    }else if(gameState == -1){
        update["losecount"] = user.losecount+1;
    }
    console.log(update);
    let doc = await User.findOneAndUpdate(filter, update, {
        new: true
    });
    res.json(doc);
}


const fs = require("fs");
const path = require('path');

const getWordByRating = (rating)=>{
    var wordlist = getWordList();
    const closest = wordlist.reduce((a, b) => {
        return Math.abs(b.difficulty - rating) < Math.abs(a.difficulty - rating) ? b : a;
    });

    return closest;
}

const getWordList = ()=>{
    var words = [];
    var filePath = path.join(__dirname, 'words_lognormal.csv');
    var allFileContents = fs.readFileSync(filePath, 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line =>  {
        var arr = line.split(',');
        if(arr[0]!=''){
            words.push({
                index: arr[0],
                words: arr[1]+arr[2]+arr[3]+arr[4]+arr[5],
                difficulty: arr[6]
            });
        }
    });
    /*words.sort(function(a, b) {
        if (a.difficulty < b.difficulty) return -1;
        if (a.difficulty > b.difficulty) return 1;
        return 0;
    });*/
    
    return words;
}

module.exports = {
    getWordfromRating,updateRating
}