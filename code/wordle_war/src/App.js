import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import ConfirmEmail from './components/auth/confirmEmail';
import ResetPW from './components/auth/resetPassword';
import Home from './components/home/Home';
import Header from './components/Header';
import RequireAuth from './components/auth/RequireAuth';
import Game from './components/game/game';
import Tile from './components/game/Tile';
import GameRoom from './components/game/multi/multiGame';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  return (

    <Router>
      <nav>
        <Header />
      </nav>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="game" element={<Game />} />
        <Route path="mgame" element={<GameRoom />} />
        <Route path="reset" element={<ResetPW />} />
        <Route path="tile" element={<Tile />} />
        {/* <Route path="confirmEmail" element={<ConfirmEmail />} /> */}
        
        <Route element={<RequireAuth />} >
        <Route path="/" element={<Home />} />
        </Route>

      </Routes>
      <hr></hr>
      <div> cuhk </div>
    </Router>

  );
}

export default App;