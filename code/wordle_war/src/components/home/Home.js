import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import useAuth from "../hooks/useAuth";

import axios from '../../api/axios';
import DefaultImage from "./DefaultImage";

const Home = () => {
    const navigate = useNavigate();
    //return to main page
    const logout = async () => {
        navigate('/main');
    }
    const toAdmin = () => {
        window.location.href = 'http://localhost:3500/admin';
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const [msg, setMsg] = useState('');
    const popup = (msg) => {
        setMsg(msg);
        setTimeout(() => {
            setMsg('');
        }, 2000);

    };
    const handleFileChange = async () => {
        const file = document.querySelector('#newFile').files[0];
        console.log(file);
        var photo = await toBase64(file);
        let profilePhoto = document.getElementById("profilePhoto");
        profilePhoto.src = photo;
        var copy = JSON.parse(JSON.stringify(auth))
        copy.photo = photo;
        setAuth(copy);
        popup('image uploaded!');
        console.log("upload", auth.userid);
        console.log("aaaaaaaaaaaaaaaaaa",  photo);
        const uploadServerLink = '/uploadImage'
        try {

        
            

            const responseImage = await axios.post('/uploadImage',
                JSON.stringify( {userid: auth.userid,   photo: photo} ),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log("responseImage", responseImage);


        } catch (err) {
            console.log("(upload image)", err);
        }

        var req = {
            userid: auth.userid,
            photo: photo
        };

        console.log("(unload image)", req);


        try {
            const response = await axios.get('/users/photo',
                JSON.stringify(req),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log("response", response);
        } catch (err) {
            console.log("(unload image)", err);
        }
    };
    const { auth, setAuth } = useAuth();
    console.log("authaaaaa", auth);
    return (
        <div className="center-container">
            <div className="center">
                <section>

                    <div className="title-container">Home</div>
                    <br />
                    <p>You are logged in!</p>
                    <br />
                    <h3>private (with login)</h3>
                    <div className="profile">
                        <div className="profilePhoto-container">
                            Profile Photo
                            {auth.photo && <img id="profilePhoto" src={auth.photo} />}
                            {!auth.photo && <img id="profilePhoto" src={DefaultImage} />}

                            <div className="uploadPhoto-container">
                                Upload new image<input type="file" id="newFile" onChange={handleFileChange} />
                            </div>
                            {msg != "" && <div className="errmsg">{msg}</div>}
                        </div>
                        <i>User {auth.username}</i><br />
                        Rating: {parseFloat(auth.rating).toFixed(1)} <br />

                        Win Rate: {
                            (Math.ceil((parseFloat(auth.wincount) /
                                (parseFloat(auth.wincount) + parseFloat(auth.losecount)) * 10000)) / 100) || 0
                        }% (Wins: {parseFloat(auth.wincount)},Losses: {parseFloat(auth.losecount)})
                    </div>
                    <br />
                    <div id="navList">
                        <Link to="/game">Single Player Game</Link>
                        <br />
                        <Link to="/mgame">Multiplayer Game</Link>
                        <br />
                        <Link to="/setting">Profile Setting</Link>
                        <br />
                        <Link to="/editor">Go to the Editor page</Link>
                        <br />
                        {/* <Link to={"http://localhost:3500/admin"}>Go to the Admin page</Link> */}
                        <button onClick={toAdmin}>Go to the Admin dashboard</button>
                        <br />
                        <Link to="/admin">Admin page</Link>
                        <br />
                    </div>

                    {/* <Link to="/confirmEmail">Go to confirm Email</Link>
                <br /> */}
                    <div className="flexGrow">
                        <button onClick={logout}>Sign Out</button>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default Home