import React from 'react';
import Login from './../../components/login/Login';
import { Cell } from './../board/Tile';
import { Link } from 'react-router-dom';
import './Login.css';
function Login1() {
    return (
        <div className='Login'>

            <div className="row">
                <div className="flex justify-center mb-1 mt-4">
                    <Cell
                        isRevealing={true}
                        isCompleted={true}
                        value="L"
                        status="correct"
                    />
                    <Cell value="O" />
                    <Cell value="G" />
                    <Cell value="I" />
                    <Cell value="N" />
                </div>
                <div className="column" >
                    <section className='box'>
                        <h2>play in Guest</h2>
                        <button className='clickButton'>Click here</button>
                    </section>

                </div>
                <div className="column">

                    <section className='box'>
                        <form>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                            />
                            <br />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                required
                            />
                            <br />
                            <button className='clickButton'>Sign In</button>
                            <div className="persistCheck">
                                <input
                                    type="checkbox"
                                    id="persist"
                                />
                                <label htmlFor="persist">Trust This Device</label>
                            </div>
                        </form>
                        <p>
                            Need an Account?
                     
                            <Link to="/Register"> Sign Up</Link>
                            <br />
                        </p></section>

                </div>
            </div>
        </div>



    );
}

export default Login1;
