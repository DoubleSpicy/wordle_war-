const User = require('../model/User');
import Elo from './elo';

//{player1 : player1id, player2 : player2id}
const createNewGameRoom =  async (req, res) => {
    if (!req?.params?.player1) return res.status(400).json({ "message": 'Player1 ID required' });
    if (!req?.params?.player2) return res.status(400).json({ "message": 'Player2 ID required' });
    const player1 = await User.findOne({ _id: req.params.id }).exec();
    if (!player1) {
        return res.status(204).json({ 'message': `User ID ${req.params.player1} not found` });
    }
    const player2 = await User.findOne({ _id: req.params.id }).exec();
    if (!player2) {
        return res.status(204).json({ 'message': `User ID ${req.params.player2} not found` });
    }
    console.log("createNewGameRoom");
    var player1keyword = getWordByRating(player1.rating);
    var player2keyword = getWordByRating(player2.rating);
    res.json([
        {player: layer1, keyword: player1keyword},
        {player: layer2, keyword: player2keyword},
    ]);
    
}

//{player : ratingPlayer, opponent: ratingOppo, word: ratingWord, isWin: true/false }
const updateRating =  async (req, res) => {
    const { player, opponent,word,isWin } = req.body;
    if (!player || !opponent || !word || !isWin) return res.status(400).json({ 'message': 'Rating are required.' });
    var newrating = Elo.calcNewRating(isWin,player, opponent,word);
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    const filter = { id: user.id };
    const update = { rating : newrating};
    if(isWin){
        update["wincount"] = user.wincount+1;
    }else{
        update["losecount"] = user.losecount+1;
    }

    let doc = await Character.findOneAndUpdate(filter, update, {
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

    console.log(closest);
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
    createNewGameRoom
}