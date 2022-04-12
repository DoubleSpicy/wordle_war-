// import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../context/AuthProvider";

import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
//https://github.com/gitdagray/react_protected_routes/blob/main/src/components/Login.js
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation  } from "react-router-dom";

import useAuth from '../hooks/useAuth';

//https://github.com/gitdagray/react_login_form/blob/main/src/Register.js
import axios from '../../api/axios';
const LOGIN_URL = '/Auth';

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ user, pwd })
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const username = response?.data?.username;
            const userid = response?.data?.userid;
            const rating = response?.data?.rating;
            const wincount = response?.data?.wincount;
            const losecount = response?.data?.losecount;
            setAuth({ user, pwd, roles, accessToken, userid, username,rating,wincount,losecount });
            setUser('');
            setPwd('');
            // setSuccess(true);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div class="center">
            
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Login In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>
            {/* )} */}
        </div>
    )
}

export default Login


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log({ user, pwd })
    //     try {
    //         const response = await axios.post(LOGIN_URL,
    //             JSON.stringify({ user, pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    //         console.log(JSON.stringify(response?.data));
    //         console.log(JSON.stringify(response));
    //         const accessToken = response?.data?.accessToken;
    //         const roles = response?.data?.roles;
    //         setAuth({ user, pwd, roles, accessToken });
    //         setUser('');
    //         setPwd('');
    //         setSuccess(true);
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 400) {
    //             setErrMsg('Missing Username or Password');
    //         } else if (err.response?.status === 401) {
    //             setErrMsg('Unauthorized');
    //         } else {
    //             setErrMsg('Login Failed');
    //         }
    //         errRef.current.focus();
    //     }
    // }

// {success ? (
//     <section>
//         <h1>You are logged in!</h1>
//         <br />
//         <p>
//             <a href="#">Go to Home</a>
//         </p>
//     </section>
// ) : (
//     <section>
//         <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//         <h1>Sign In</h1>
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="username">
//                 Username:
//             </label>
//             <input
//                 type="text"
//                 id="username"
//                 ref={userRef}
//                 autoComplete="off"
//                 onChange={(e) => setUser(e.target.value)}
//                 value={user}
//                 required
//             />

//             <label htmlFor="password">
//                 Password:
//             </label>
//             <input
//                 type="password"
//                 id="password"
//                 onChange={(e) => setPwd(e.target.value)}
//                 value={pwd}
//                 required
//             />
//             <button type="button" class="btn btn-primary btn-lg" >Sign In</button>
//         </form>
//         <p>
//             Need an Account?<br />
//             <span className="line">
//                 {/*put router link here*/}
//                 <Link to="/register">Sing up</Link>
//             </span>
//         </p>
//     </section>
// )}


