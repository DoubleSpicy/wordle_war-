const log = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;
   
    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};

const onChatSubmitted = (sock) => (e) => {
    e.preventDefault();
  
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';
  
    sock.emit("message",text);
};

const getBoard = (canvas, numCells = 20) => {
    const context = canvas.getContext("2d");
    const cellSize = Math.floor(canvas.width / numCells);

    const fillCell = (x,y, color) => {
        context.fillStyle=color;
        context.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);

    };
    context.strokeStyle = "#333"; //DARK GREY
    //draw grid lines
    const drawGrid= () => {
        context.beginPath();
        for(let i =0;i<numCells+1;i++){
            context.moveTo(i*cellSize,0);
            context.lineTo(i*cellSize,cellSize*numCells);
            context.moveTo(0,i*cellSize);
            context.lineTo(cellSize*numCells,i*cellSize);
        }
        context.stroke();
    };

    const clear = () =>{
        context.clearRect(0,0,canvas.width,canvas.height);
    };

    const renderBoard = (board = []) =>{
        board.forEach((row,y) => {
            row.forEach((color,x)=>{
                color && fillCell(x,y,color);
            });
        });

    };

    //draw the initial state of the board
    const reset = (board) =>{
        clear();
        drawGrid();
        renderBoard(board);
    };

    const getCellCoordinates = (x,y ) => {
        return{
            x:Math.floor(x/cellSize),
            y:Math.floor(y/cellSize)
        };
    };

    return { fillCell, reset, getCellCoordinates};
};

const getClickCoordinates=(element,event) => {
    const {top,left } = element.getBoundingClientRect();
    const {clientX, clientY} = event;

    return {
        x: clientX - left,
        y: clientY - top
    };
}

(() => {
    //canvas element
    const canvas = document.querySelector("canvas");
    const {fillCell, reset, getCellCoordinates} = getBoard(canvas);//get the fillRect value of the getBoard(canvas) object (getBoard(canvas).fillRect) 
    
    const sock = io();
    
    const onClick = (e)=>{
        const{x,y}=getClickCoordinates(canvas,e);
        sock.emit("turn",{cor:getCellCoordinates(x,y),id:sock.id}); //event type:turn , send x,y coordinates
    
    
    };
   
    sock.on("board", reset);
    sock.on("message",log);
    sock.on("turn",({cor,color,id}) => {//wait for "turn" event call from server side
        //the rectangle you placed will be green, the others' will be in random
        if(id===sock.id)//id: other user id, sock.id:id of the corresponding user
        fillCell(cor.x,cor.y,"green");
        else
        fillCell(cor.x,cor.y,color);
    });
    document.querySelector("#chat-form").addEventListener("submit",onChatSubmitted(sock));

    canvas.addEventListener("click",onClick)

})();