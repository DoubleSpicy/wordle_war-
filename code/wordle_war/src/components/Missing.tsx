import React from 'react';
import { Link } from 'react-router-dom';
import { Cell } from './board/Tile';
import './Header.css'

function Missing() {
    return (
        <div className='notFound404'>
            <Cell value="你"
                isRevealing={true}
                isCompleted={true}
                status="absent"
            />
            <Cell
                isRevealing={true}
                isCompleted={true}
                value="4"
                status="correct"
            />
            <Cell value="0"
                isRevealing={true}
                isCompleted={true}
                status="absent"
            />
            <Cell value="4"
                status="present"
                isRevealing={true}
                isCompleted={true}
            />
            <Cell value="咗"
                status="present"
                isRevealing={true}
                isCompleted={true} />
        </div>

    );
}

export default Missing;