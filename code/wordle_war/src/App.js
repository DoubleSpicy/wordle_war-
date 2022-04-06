import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ResetPW from './components/auth/resetPassword';
import Home from './components/home/Home';
import Header from './components/Header';
import RequireAuth from './components/auth/RequireAuth';
import Game from './components/game/Game';
import Tile from './components/game/Tile';
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
        <Route path="reset" element={<ResetPW />} />
        <Route path="tile" element={<Tile />} />

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