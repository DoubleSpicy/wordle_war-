import { useNavigate, Link } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";

const Game = () => {
  const [word, setWord] = useState();
  const [wordGrid, setWordGrid] = useState([]);

  useEffect(() => {
    function createSquares() {
      const gameBoard = document.getElementById("board");

      for (let index = 0; index < 30; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate__animated");
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
      }
    }
  });

  return (
    <div className="center">
      {/* <section>
                <h1>Home</h1>
                <br />
                Single player
            </section> */}


      <div id="board-container">
        <div id="board"></div>
      </div>

      
      <div id="keyboard-container">
        <div className="keyboard-row">
          <button data-key="q">q</button>
          <button data-key="w">w</button>
          <button data-key="e">e</button>
          <button data-key="r">r</button>
          <button data-key="t">t</button>
          <button data-key="y">y</button>
          <button data-key="u">u</button>
          <button data-key="i">i</button>
          <button data-key="o">o</button>
          <button data-key="p">p</button>
        </div>
        <div className="keyboard-row">
          <div className="spacer-half"></div>
          <button data-key="a">a</button>
          <button data-key="s">s</button>
          <button data-key="d">d</button>
          <button data-key="f">f</button>
          <button data-key="g">g</button>
          <button data-key="h">h</button>
          <button data-key="j">j</button>
          <button data-key="k">k</button>
          <button data-key="l">l</button>
          <div className="spacer-half"></div>
        </div>
        <div className="keyboard-row">
          <button data-key="enter" className="wide-button">
            Enter
          </button>
          <button data-key="z">z</button>
          <button data-key="x">x</button>
          <button data-key="c">c</button>
          <button data-key="v">v</button>
          <button data-key="b">b</button>
          <button data-key="n">n</button>
          <button data-key="m">m</button>
          <button data-key="del" className="wide-button">
            Del
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
