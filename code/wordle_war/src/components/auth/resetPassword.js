import { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from '../../api/axios';
const LOGIN_URL = '/resetPassword';

const ResetPassword = () => {
    const [userEmail, setUserEmail] = useState('');
    // const [userHash, setUserHash] = useState('');
    const [isSendEmail, setIsSendEmail] = useState(false)
    const userRef = useRef();
    const errRef = useRef();
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({ userEmail });
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: userEmail }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setSuccess(true);
        } catch (err) {

            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('User email not found!');
            }
            errRef.current.focus();
        }
    }


    return (
        <div class="center">

            {success ? (
                <section>
                    <h1>"Please check your email to reset the password!"</h1>
                    <br />
                    <p>
                        <Link to="/">Go to Home</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>reset password</h1>
                    <form onSubmit={handleSubmit}>
                        <p style={{ display: success ? "block" : "none" }}>{userEmail}</p>
                        <label htmlFor="userEmail">
                            reset Email:
                        </label>
                        <input
                            // type="text"
                            type="email"
                            id="userEmail"
                            value={userEmail}
                            autoComplete="off"
                            required
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        <button>Reset password</button>
                    </form>
                </section>
            )}
        </div>


    );
};

export default ResetPassword;
