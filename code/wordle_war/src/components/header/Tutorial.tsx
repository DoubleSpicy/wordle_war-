import React, { useState } from 'react'
import Game from '../game/Game'
import classnames from "classnames";


export type CharStatus = "absent" | "present" | "correct";
type Props = {
    value?: string;
    status?: CharStatus;
};
//https://github.com/cwackerfuss/react-wordle/blob/main/src/components/grid/Cell.tsx
export const Cell = ({ value, status }: Props) => {
    const classes = classnames(
        "w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded",
        {
            ' border-slate-200':
                !status,
            'absent shadowed bg-slate-400 text-white border-slate-400 ':
                status === "absent",
            'correct shadowed bg-orange-500 text-white border-black-500':
                status === "correct",
            'present shadowed bg-yellow-500 text-white border-yellow-500':
                status === "present",
        }
    );

    return (
        <>
            <div className={classes}>{value}</div>
        </>
    );
};

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
                <Cell value="W" status="correct" />
                <Cell value="E"  status="absent" />
                <Cell value="A"  status="present"/>
                <Cell value="R" />
                <Cell value="Y" />
            </div>
            <div>The letter <strong>W</strong> is in the word and in the correct spot.</div>


            <hr></hr>
            <div className="flex justify-center mb-1 mt-4">
                <Cell value="W" status="correct" />
                <Cell value="E"  status="absent" />
                <Cell value="A"  status="present"/>
                <Cell value="R" />
                <Cell value="Y" />
            </div>
            <div>The letter <strong>I</strong> is in the word but in the wrong spot.</div>
            <hr></hr>
            <div className="flex justify-center mb-1 mt-4">
                <Cell value="W" status="correct" />
                <Cell value="E"  status="absent" />
                <Cell value="A"  status="present"/>
                <Cell value="R" />
                <Cell value="Y" />
            </div>
            <div>The letter <strong>U</strong> is not in the word in any spot.</div>
            <hr></hr>
            by CSCI3100 B2 with additional modes and features.in Typescript by
            <a href="https://github.com/" target="_blank"> asd</a>.
            <br />
            Open the settings menu to see some of the additional features.

        </div>
    )
}


