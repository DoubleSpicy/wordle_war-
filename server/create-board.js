//module for storing game mechanics
const createBoard = (size) =>{
    let board;

    const clear =( )=>{
        board = Array(size).fill().map(() => Array(size).fill(null)); // array filled with nulls 
    };

    const getBoard = () => board;
    const makeTurn = (x,y,color)=>{
        board[y][x]= color; 
    };

    clear();

    return {clear,getBoard,makeTurn};
};

module.exports = createBoard;