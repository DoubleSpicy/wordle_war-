import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../../api/axios';

const AdminChangePw = () => {
    const [users, setUsers] = useState();

    const [userEmail, setUserEmail] = useState('');
    const [isSendEmail, setIsSendEmail] = useState(false)

    const [userPw, setUserPw] = useState('');
    const [isSendPw, setIsSendPw] = useState(false)

    const userRef = useRef();
    const errRef = useRef();


    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');


    const adminChangePassword = '/adminChangePassword';
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({ userEmail , userPw });
        try {
            const response = await axios.post(adminChangePassword,
                JSON.stringify({  userEmail,  userPw}),
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
        <div>
            change password:
            {success ? (
                <section>
                    <h1>"reseted password!"</h1>
                    <br />
                    <p>
                        <Link to="/">Go to Home</Link>
                    </p>
                </section>
            ) : (<section>
                <form onSubmit={handleSubmit}>
                    <p style={{ display: success ? "block" : "none" }}>{userEmail}</p>
                    <label htmlFor="userEmail">
                        user id:
                    </label>
                    <input
                        // type="text"
                        type="text"
                        id="userEmail"
                        value={userEmail}
                        autoComplete="off"
                        required
                        onChange={(e) => setUserEmail(e.target.value)}
                    />

                    <label htmlFor="userPw">
                        password:
                    </label>
                    <input
                        // type="text"
                        type="text"
                        id="userPw"
                        value={userPw}
                        autoComplete="off"
                        required
                        onChange={(e) => setUserPw(e.target.value)}
                    />
                    <button>Reset password</button>
                </form>
            </section>
            )}

        </div>
    );
};

export default AdminChangePw;