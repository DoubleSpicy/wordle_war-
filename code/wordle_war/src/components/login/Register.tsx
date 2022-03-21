import React from 'react';
import Login from './../../components/login/Login';
import { Cell } from './../board/Tile';
import { Link } from 'react-router-dom';

function Register() {
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
                    <Cell value="G" />
                    <Cell value="I" />
                    <Cell value="S" />
                    <Cell value="T" />
                    <Cell value="E" />
                    <Cell value="R" />
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
                            <label htmlFor="password">Password again:</label>
                            <input
                                type="password"
                                id="password"
                                required
                            />
                            <button className='clickButton'>Reginster!</button>
                            <div className="persistCheck">
                                <input
                                    type="checkbox"
                                    id="persist"
                                />
                                <label htmlFor="persist">Trust This Device</label>
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

export default Register;
