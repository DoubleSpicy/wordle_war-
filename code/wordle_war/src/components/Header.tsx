import './Header.css';
import React, { useState } from 'react'
import Tutorial from './wedgets/Tutorial'
import Setting from './wedgets/Setting'

import useDarkMode from "use-dark-mode";


export default function Header() {
    const [showInfo, toggleShowInfo] = useState(false);
    const [showSetting, toggleShowSetting] = useState(false);
    const [showdarkMode, toggleShowdarkMode] = useState(false);

    const darkMode = useDarkMode(false);



    return (
        <div>
            <nav>
                <header>

                    <div className="header_left" >
                        <button onClick={() => toggleShowInfo(!showInfo)}>
                            info: {showInfo ? "show1" : "hide1"}
                        </button>

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
                    </div>
                    <div className="header_logo" >
                        wordle_CUHK
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
                        </div>
                    </div>
                </header>

            </nav>
            <hr></hr>
        </div>
    )
}


// import React, {useState} from 'react'
// import './Header.css';

//     return (
//         <div>
//             <header>
//                 <div>
//                     <p>info</p>
//                 </div>
//                 <div>
//                     wordle_CUHK
//                 </div>
//                 <div>
//                     setting
//                 </div>
//             </header>
//         </div>
//     )
// }

// export default header;