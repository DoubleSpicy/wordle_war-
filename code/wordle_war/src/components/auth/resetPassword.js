import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";


const ResetPassword = () => {
    const [userEmail, setUserEmail] = useState('');

    const [isSendEmail, setIsSendEmail] = useState(false)

    const [success, setSuccess] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
 
        console.log({ userEmail });
    }


    return (
        <div class="center">
            <section>
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
        </div>


    );
};

export default ResetPassword;
