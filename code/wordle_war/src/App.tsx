
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Login from './components/login/Login';
import Missing from './components/Missing';
import Register from './components/login/Register';
import Reset from './components/login/ResetPw';
import Teleport from './components/Teleport';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <nav>
        <Header />
      </nav>
      <Routes>
        <Route path="/" element={<Teleport />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Missing />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
      <hr></hr>
      <div> cuhk </div>
    </Router>
  );
}

export default App;



// import Header from './components/Header';
// import Layout from './components/Layout';
// import './App.css';
// import { Cell } from './components/board/Tile';


// import { BrowserRouter as Routes, Route, Router } from 'react-router-dom';

// import Login from './components/login/Login';
// import Register from './components/login/Register';

// import Test from './test'

// function App() {
//   return (


//     <div className="App">
//       <Header />
//       <main>
//         <Login />
//       </main>

//     </div>
//   );
// }

// export default App;
