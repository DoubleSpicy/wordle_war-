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

        <div className="center">
            <section>
                <h1>Home</h1>
                <br />
                <p>You are logged in!</p>
                <br />
                <Link to="/setting">Go to the setting</Link>
                <br />
                <Link to="/game">Go to the game page</Link>
                <br />
                <Link to="/mgame">Go to the Mutiplay game page</Link>
                <br />
                <Link to="/login">Go to login</Link>
                <br />
                <Link to="/register">Go to register</Link>
                <br />
                <Link to="/reset">Go to reset password</Link>
                <br />
                <div className="flexGrow">
                    <button onClick={logout}>Sign Out</button>
                </div>
            </section>
        </div>

    )
}

export default Home