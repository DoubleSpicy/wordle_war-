import React, { useState } from 'react'
import './Tutorial.css';
import { Cell } from '../board/Tile';

export default function Tutorial() {


    return (
        <div>
            <h3>how to play</h3>
            <div>Guess the <strong>WORDLE</strong> in  tries.</div>
            <div>Each guess must be a valid  letter word. Hit the enter button to submit.</div>
            <div>
                After each guess, the color of the tiles will change to show how close your guess was to the
                word.
            </div>

            <div><strong>Examples</strong></div>
            <hr></hr>
            <div className="flex justify-center mb-1 mt-4">
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
            </div>
            <div>The letter <strong>W</strong> is in the word and in the correct spot.</div>


            <hr></hr>
            <div className="flex justify-center mb-1 mt-4">
                <Cell value="P" />
                <Cell value="I" />
                <Cell
                    isRevealing={true}
                    isCompleted={true}
                    value="L"
                    status="present"
                />
                <Cell value="O" />
                <Cell value="T" />
            </div>
            <div>The letter <strong>I</strong> is in the word but in the wrong spot.</div>
            <hr></hr>
            <div className="flex justify-center mb-1 mt-4">
                <Cell value="V" />
                <Cell value="A" />
                <Cell value="G" />
                <Cell isRevealing={true} isCompleted={true} value="U" status="absent" />
                <Cell value="E" />
            </div>
            <div>The letter <strong>U</strong> is not in the word in any spot.</div>
            <hr></hr>
            by CSCI3100 B2 with additional modes and features.in Typescript by
            <a href="https://github.com/UMZR" target="_blank"> UMZR</a>.
            <br />
            Open the settings menu to see some of the additional features.

        </div>
    )
}


