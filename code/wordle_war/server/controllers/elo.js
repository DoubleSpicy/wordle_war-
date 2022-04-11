const Elo = {
    calcWinrate(ratingPlayer,ratingOppoWord){
        return 1/(1+10^((ratingOppoWord-ratingPlayer)/400))
    },
    calcNewRating(isWin,ratingPlayer,ratingOppo,ratingWord){
        isWin = (isWin)? 1:0;
        return ratingPlayer + 0.05 * (isWin - 
            Math.sqrt(calcWinrate(ratingPlayer,ratingOppo) * calcWinrate(ratingPlayer,ratingWord)));
    }
};

export default Elo;