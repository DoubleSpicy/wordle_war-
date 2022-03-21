import React from 'react';
import Login from './Login';
import { Cell } from '../board/Tile';
import { Link } from 'react-router-dom';

function reset() {
    return (
        <div className='Register'>

            <div className="row">
                <div className="flex justify-center mb-1 mt-4">
                    <Cell
                        isRevealing={true}
                        isCompleted={true}
                        value="R"
                        status="correct"
                    />
                    <Cell value="E" />
                    <Cell value="S" />
                    <Cell value="E" />
                    <Cell value="T" />
             
                </div>

                <div className="column-1">

                    <section className='box'>
                        <form>
                            <label htmlFor="username">Email:</label>
                            <br />
                            <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                            />
                            <br />
                            
                            <button className='clickButton'>submit!</button>
                            <div className="persistCheck">
                             </div>
                        </form>
                        <p>
                            Already registered?<br />
                            <span className="line">
                                <Link to="/">Sign In</Link>
                            </span>
                        </p>
                    </section>

                </div>
            </div>
        </div>


    );
}

export default reset;
