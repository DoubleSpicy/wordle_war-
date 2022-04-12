const Elo = {
    calcWinrate(ratingPlayer,ratingOppoWord){
        return 1/(1+10^((ratingOppoWord-ratingPlayer)/400))
    },
    calcNewRating(gameState,ratingPlayer,ratingOppo,ratingWord){
        gameState = (gameState == 1)? 4: ((gameState == -1)? 0 : 2);
        return ratingPlayer + 0.05 * (gameState - 
            Math.sqrt(this.calcWinrate(ratingPlayer,ratingOppo) * this.calcWinrate(ratingPlayer,ratingWord)));
    }
};

module.exports = Elo;