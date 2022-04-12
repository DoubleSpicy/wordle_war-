const Elo = {
    calcWinrate(ratingPlayer,ratingOppoWord){
        return 1/(1+10^((ratingOppoWord-ratingPlayer)/400))
    },
    calcNewRating(gameState,ratingPlayer,ratingOppo,ratingWord){
        gameState = (gameState == 1)? 1: ((gameState == -1)? 0 : 0.5);
        return ratingPlayer + 0.05 * (gameState - 
            Math.sqrt(this.calcWinrate(ratingPlayer,ratingOppo) * this.calcWinrate(ratingPlayer,ratingWord)));
    },
    calcNewWordRating(gameState,ratingWord,ratingPlayer){
        gameState = (gameState == 1)? 1: ((gameState == -1)? 0 : 0.5);
        return ratingWord + 0.05 * (gameState - 1/((1+10)^((ratingWord-ratingPlayer)/400)));
    }
};

module.exports = Elo;