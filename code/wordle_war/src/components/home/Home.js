import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const navigate = useNavigate();
    //return to main page
    const logout = async () => {
        navigate('/main');
    }
    const toAdmin = ()=>{
        window.location.href='http://localhost:3500/admin';
    }

    const { auth } = useAuth();
    console.log("auth",auth);
    return (

        <div className="center">
            <section>
                <h1>Home</h1>
                <div className="profile">
                    <i>User {auth.username}</i><br />
                    Rating: {parseFloat(auth.rating).toFixed(1)} <br />
                    
                    Win Rate: {
                        (Math.ceil((parseFloat(auth.wincount)/
                        (parseFloat(auth.wincount)+parseFloat(auth.losecount)) * 10000))/100) || 0
                    }% (Wins: {parseFloat(auth.wincount)},Losses: {parseFloat(auth.losecount)})
                </div>
                <br />
                <p>You are logged in!</p>
                <br />
                <h3>private (with login)</h3>
                <br />
                <Link to="/setting">Go to the setting</Link>
                <br />
                <Link to="/game">Go to the game page</Link>
                <br />
                <Link to="/mgame">Go to the Mutiplay game page</Link>
                <br />
                <Link to="/editor">Go to the Editor page</Link>
                <br />
                {/* <Link to={"http://localhost:3500/admin"}>Go to the Admin page</Link> */}
                <button onClick={toAdmin}>Go to the Admin dashboard</button>
                <br />
                <Link to="/admin">Go to the Admin page</Link>
                <br />
                {/* <Link to="/confirmEmail">Go to confirm Email</Link>
                <br /> */}
                <div className="flexGrow">
                    <button onClick={logout}>Sign Out</button>
                </div>
            </section>
        </div>

    )
}

export default Home