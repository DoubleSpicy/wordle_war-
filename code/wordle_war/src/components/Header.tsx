
import React, { useState } from 'react'
import Tutorial from './header/Tutorial'
import Setting from './header/Setting'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import useDarkMode from "use-dark-mode";

//UI
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
                    <Button onClick={() => toggleShowInfo(!showInfo)}>
                        
                        <HelpOutlineIcon />
                        <div className="expand">
                            {showInfo ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </div>
                    </Button>

                </div>
                <div className="header_logo" >
                    <Link to="/"> wordle_CUHK</Link>
                </div>
                <div className="header_right">
                    <div>
                        {" "}
                        <Button onClick={() => {
                            toggleShowdarkMode(!showdarkMode);
                            if(showdarkMode){
                                darkMode.enable();
                            }else{
                                darkMode.disable();
                            }
                        }}>
                        {showdarkMode ? <LightModeIcon/> : <DarkModeIcon/>}

                        </Button>{" "}



                    </div>
                    <div>
                        {" "}
                        <Button onClick={() => toggleShowSetting(!showSetting)}>
                            <SettingsIcon/>
                        </Button>{" "}

                    </div>
                </div>
            </header>


            {showInfo && (
                <div className="PopUp">
                    {" "}
                    <Button
                        className="popup-x"
                        onClick={() => toggleShowInfo(!showInfo)}
                    >
                        <CloseIcon />
                    </Button>
                    <Tutorial />
                </div>
            )}


            {showSetting && (
                <div className="PopUp">
                    {" "}
                    <Button
                        className="popup-x"
                        onClick={() => toggleShowSetting(!showSetting)}
                    >
                        <CloseIcon />
                    </Button>
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


