import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Header from './components/Header';
import RequireAuth from './components/auth/RequireAuth';
import Game from './components/game/game';
import MGame from './components/game/mgame';

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
        <Route path="mgame" element={<MGame />} />

        <Route element={<RequireAuth />} >
          <Route path="/" element={<Home />} />
        </Route>

      </Routes>
      <div className='footer'> cuhk </div>
    </Router>

  );
}

export default App;