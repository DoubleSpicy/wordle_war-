import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";

const Home = () => {
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        // setAuth({});
        navigate('/login');
    }

    return (

        <div className="center-container">
        <div className="center">
            <section>
                <h1>Home</h1>
                <br />
                <p>You are no logged in!</p>
                <br />
                <h3>public (no login)</h3>
                <div id="navList">
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/register">Register</Link>
                    <br />
                    <Link to="/reset">Forget Password? reset password</Link>
                    
                </div>
                <br />
                {/*<br />
                    <Link to="/confirmPwd">Go to confirmPwd(with email)</Link>
                <Link to="/setting">Go to the setting (no setting)</Link>
                <br />
                <Link to="/game">Go to the game page (single player)</Link>
                <br />
    <Link to="/mgame">Go to the Mutiplay game page (guest)</Link>*/}

                {/* <div className="flexGrow">
                    <button onClick={logout}>Sign Out</button>
                </div> */}
            </section>
        </div>
        </div>

    )
}

export default Home