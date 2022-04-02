import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";
import Button from '@mui/material/Button';

const Home = () => {
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        // setAuth({});
        navigate('/login');
    }

    const buttonList = [
        {link:"/setting",title:"Setting"},
        {link:"/game",title:"Game"},
        {link:"/login",title:"Login"},
        {link:"/register",title:"Register"},
        {link:"/reset",title:"Reset Password"},
    ];

    const navTo = async (link:string) => {
        navigate(link);
    }

    

    return (

        <div className="center">
            <section>
                <h1>Home</h1>
                <br />
                <p>You are logged in!</p>
                <br />
                <div id="home-menu">
                {
                    buttonList.map((button, index) => 
                        (  
                        <div key={index} className="home-menu-btn" onClick={()=> navTo(button.link)}>
                            <span>{button.title}</span>
                        </div>
                        )
                    )
                }  
                </div>
                <div className="flexGrow">
                    <Button onClick={logout}>Sign Out</Button>
                </div>
            </section>
        </div>

    )
}

/*
<Link to="/setting">Go to the setting</Link>
                <br />
                <Link to="/game">Go to the game page</Link>
                <br />
                <Link to="/login">Go to login</Link>
                <br />
                <Link to="/register">Go to register</Link>
                <br />
                <Link to="/reset">Go to reset password</Link>
                <br />
*/
export default Home