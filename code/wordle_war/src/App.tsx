import React from 'react';
import Header from './components/Header';
import './App.css';
import { Cell } from './components/board/Tile';
function App() {
  return (
    <div className="App">
      <body>
        <Header />
        <Cell
                    isRevealing={true}
                    isCompleted={true}
                    value="W"
                    status="correct"
                />
                <Cell value="E" />
                <Cell value="A" />
                <Cell value="R" />
                <Cell value="Y" />
      </body>

    </div>
  );
}

export default App;
