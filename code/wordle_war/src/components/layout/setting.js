import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;
const REGISTER_URL = '/userChangePassword';

const Setting = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [oldPwd, setoldPwd] = useState('');
    const [validoldPwd, setValidoldPwd] = useState(false);
    const [oldPwdFocus, setoldPwdFocus] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, user, pwd, matchPwd, oldPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v2 = PWD_REGEX.test(pwd);
        if (!v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        if(pwd == oldPwd){
            setErrMsg("cannot input same password!");
            return;
        }
        console.log({ email, user, pwd, oldPwd })
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response))
            setSuccess(true);
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            errRef.current.focus();
        }
    }
    return (
        <div className="center">
            <section>
                <h1>setting</h1>
                <br />

                <p>change password</p>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit}>


                    <label htmlFor="userEmail">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="userEmail"
                        value={email}
                        autoComplete="off"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />


                    <label htmlFor="oldpassword">
                        Old Password:
                    </label>
                    <input
                        type="text"
                        id="oldPwd"
                        autoComplete="off"
                        onChange={(e) => setoldPwd(e.target.value)}
                        value={oldPwd}
                        required
                    />

                    <label htmlFor="password">
                        New Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                    <label htmlFor="confirm_pwd">
                        Confirm New Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                    <button disabled={!validPwd || !validMatch ? true : false}>change password</button>

                </form>
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        </div>

    )
}

export default Setting

// import { useRef, useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from '../../api/axios';

// const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;
// const REGISTER_URL = '/register';

// const Register = () => {
//     const userRef = useRef();
//     const errRef = useRef();

//     const [pwd, setPwd] = useState('');
//     const [validPwd, setValidPwd] = useState(false);
//     const [pwdFocus, setPwdFocus] = useState(false);

//     const [matchPwd, setMatchPwd] = useState('');
//     const [validMatch, setValidMatch] = useState(false);
//     const [matchFocus, setMatchFocus] = useState(false);

//     const [errMsg, setErrMsg] = useState('');


//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setValidPwd(PWD_REGEX.test(pwd));
//         setValidMatch(pwd === matchPwd);
//     }, [pwd, matchPwd])

//     useEffect(() => {
//         setErrMsg('');
//     }, [pwd, matchPwd])

//     const [success, setSuccess] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const v2 = PWD_REGEX.test(pwd);
//         if (!v2) {
//             setErrMsg("Invalid Entry");
//             return;
//         }
//         console.log({ pwd })
//         try {
//             const response = await axios.post(REGISTER_URL,
//                 JSON.stringify({ pwd }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             console.log(JSON.stringify(response?.data));
//             console.log(JSON.stringify(response))
//             setSuccess(true);
//             setPwd('');
//             setMatchPwd('');
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             }
//             errRef.current.focus();
//         }
//     }

//     return (
//         <div className="center">
//             <h1>setting</h1>
//             <section>
//                 <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//                 <br />
//                 <p>change password</p>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="password">
//                         Password:
//                         <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
//                         <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         onChange={(e) => setPwd(e.target.value)}
//                         value={pwd}
//                         required
//                         aria-invalid={validPwd ? "false" : "true"}
//                         aria-describedby="pwdnote"
//                         onFocus={() => setPwdFocus(true)}
//                         onBlur={() => setPwdFocus(false)}
//                     />
//                     <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
//                         <FontAwesomeIcon icon={faInfoCircle} />
//                         8 to 24 characters.<br />
//                         Must include uppercase and lowercase letters, a number and a special character.<br />
//                         Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
//                     </p>


// <label htmlFor="confirm_pwd">
//     Confirm Password:
//     <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
//     <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
// </label>
// <input
//     type="password"
//     id="confirm_pwd"
//     onChange={(e) => setMatchPwd(e.target.value)}
//     value={matchPwd}
//     required
//     aria-invalid={validMatch ? "false" : "true"}
//     aria-describedby="confirmnote"
//     onFocus={() => setMatchFocus(true)}
//     onBlur={() => setMatchFocus(false)}
// />
// <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//     <FontAwesomeIcon icon={faInfoCircle} />
//     Must match the first password input field.
// </p>

//                     <button disabled={!validPwd || !validMatch ? true : false}>change page</button>
//                 </form>
//             </section>
//         </div>
//     )
// }

// export default Register

