
import React, { useState } from 'react'
import Tutorial from './header/Tutorial'
import Setting from './header/Setting'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import useDarkMode from "use-dark-mode";

import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';

export default function Header() {
    const [showInfo, toggleShowInfo] = useState(false);
    const [showSetting, toggleShowSetting] = useState(false);
    const [showdarkMode, toggleShowdarkMode] = useState(false);

    const darkMode = useDarkMode(false);



    return (
        <div>
            <header>
                <div className="header_left" >
                    <button onClick={() => toggleShowInfo(!showInfo)}>
                        info: {showInfo ? "show1" : "hide1"}
                    </button>

                </div>
                <div className="header_logo" >
                    <Link to="/"> wordle_CUHK</Link>
                </div>
                <div className="header_right">
                    <div>
                        {" "}
                        <button onClick={() => toggleShowdarkMode(!showdarkMode)}>
                            {showdarkMode ? <p onClick={darkMode.enable}>☀</p> : <p onClick={darkMode.disable}>☾</p>}

                        </button>{" "}


                    </div>
                    <div>
                        {" "}
                        <button onClick={() => toggleShowSetting(!showSetting)}>
                            info: {showSetting ? "setting" : "setting=C"}
                        </button>{" "}

                    </div>
                </div>
            </header>


            {showInfo && (
                <div className="PopUp">
                    {" "}
                    <button
                        className="popup-x"
                        onClick={() => toggleShowInfo(!showInfo)}
                    >
                        X
                    </button>
                    <Tutorial />
                </div>
            )}


            {showSetting && (
                <div className="PopUp">
                    {" "}
                    <button
                        className="popup-x"
                        onClick={() => toggleShowSetting(!showSetting)}
                    >
                        X
                    </button>
                    <Setting />

                </div>
            )}

            <hr></hr>
        </div>

        // <div>

        //     <header>

        //         <div className="header_left" >
        //             <button onClick={() => toggleShowInfo(!showInfo)}>
        //                 info: {showInfo ? "show1" : "hide1"}
        //             </button>

        //         </div>
        //         <div className="header_logo" >
        //             <Link to="/"> wordle_CUHK</Link> 
        //         </div>
        //         <div className="header_right">
        // <div>
        //     {" "}
        //     <button onClick={() => toggleShowdarkMode(!showdarkMode)}>
        //         {showdarkMode ? <p onClick={darkMode.enable}>☀</p> : <p onClick={darkMode.disable}>☾</p>}

        //     </button>{" "}


        // </div>
        // <div>
        //     {" "}
        //     <button onClick={() => toggleShowSetting(!showSetting)}>
        //         info: {showSetting ? "setting" : "setting=C"}
        //     </button>{" "}

        // </div>
        //         </div>
        //     </header>
        //     <hr></hr>
        // {showInfo && (
        //     <div className="PopUp">
        //         {" "}
        //         <button
        //             className="popup-x"
        //             onClick={() => toggleShowInfo(!showInfo)}
        //         >
        //             X
        //         </button>
        //         {/* <Tutorial /> */}
        //     </div>
        // )}

        // {showSetting && (
        //     <div className="PopUp">
        //         {" "}
        //         <button
        //             className="popup-x"
        //             onClick={() => toggleShowSetting(!showSetting)}
        //         >
        //             X
        //         </button>
        //         {/* <Setting /> */}

        //     </div>
        // )}

        // </div>
    )
}


