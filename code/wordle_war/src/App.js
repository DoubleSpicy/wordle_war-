import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ResetPW from './components/auth/resetPassword';
import ConfirmPwd from './components/auth/confirmPwd';
import Home from './components/home/Home';
import HomePageNoLogin from './components/home/HomePageNoLogin';
import Header from './components/Header';
import RequireAuth from './components/auth/RequireAuth';
import Game from './components/game/game';
import Tile from './components/game/Tile';
import GameRoom from './components/game/multi/multiGame';
import Layout from './components/layout/Layout';
import Missing from './components/layout/missing';
import Admin from './components/layout/admin';
import Editor from './components/layout/editor';
import Lounge from './components/layout/Lounge';
import LinkPage from './components/layout/LinkPage';
import Unauthorized from './components/layout/Unauthorized';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="main" element={<HomePageNoLogin />} />
        <Route path="game" element={<Game />} />
        <Route path="mgame" element={<GameRoom />} />
        <Route path="reset" element={<ResetPW />} />
        <Route path="tile" element={<Tile />} />
        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="linkpage" element={<LinkPage />} />  {/* ???? */}
       
        {/* we want to protect these routes */}
       <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>


        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;


//@@@@@@@@@@@@@@@@@@@

// import Register from './components/auth/Register';
// import Login from './components/auth/Login';
// // import ConfirmEmail from './components/auth/confirmEmail';
// import ResetPW from './components/auth/resetPassword';
// import ConfirmPwd from './components/auth/confirmPwd';
// import Home from './components/home/Home';
// import Header from './components/Header';
// import RequireAuth from './components/auth/RequireAuth';
// import Game from './components/game/game';
// import Tile from './components/game/Tile';
// import GameRoom from './components/game/multi/multiGame';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// function App() {

//   return (

//     <Router>
//       <nav>
//         <Header />
//       </nav>
//       <Routes>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="game" element={<Game />} />
//         <Route path="mgame" element={<GameRoom />} />
//         <Route path="reset" element={<ResetPW />} />
//         <Route path="tile" element={<Tile />} />
//         {/* <Route path="confirmEmail" element={<ConfirmEmail />} /> */}
//         <Route path="confirmPwd/:id" element={<ConfirmPwd />} />
//         {/* <Route path="/confirmPwd/:id" component={<ConfirmPwd />}/>  */}


//         <Route element={<RequireAuth />} >
//           <Route path="/" element={<Home />} />
//         </Route>

//       </Routes>
//       <hr></hr>
//       <div> cuhk </div>
//     </Router>

//   );
// }

// export default App;

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// import Register from './components/auth/Register';
// import Login from './components/auth/Login';
// // import ConfirmEmail from './components/auth/confirmEmail';
// import ResetPW from './components/auth/resetPassword';
// import ConfirmPwd from './components/auth/confirmPwd';
// import Home from './components/home/Home';
// import Header from './components/Header';
// import RequireAuth from './components/auth/RequireAuth';
// import Game from './components/game/game';
// import Tile from './components/game/Tile';
// import GameRoom from './components/game/multi/multiGame';
// import Layout from './components/layout/Layout';
// import Missing from './components/layout/missing';
// import Unauthorized from './components/layout/Unauthorized';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }


// function App() {

//   return (

//     // <Router>
//     //   <nav>
//     //     <Header />
//     //   </nav>
//     //   <Routes>
//     //     <Route path="/" element={<Layout />}>
//     //       {/* public routes */}
//     //       <Route path="login" element={<Login />} />
//     //       <Route path="register" element={<Register />} />
//     //       <Route path="unauthorized" element={<Unauthorized />} />
//     //       <Route path="linkpage" element={<Home />} />     {/* ummm */}
//     //       <Route path="register" element={<Register />} />
//     //       <Route path="reset" element={<ResetPW />} />

//     //       <Route path="confirmPwd/:id" element={<ConfirmPwd />} />

//     //       {/* game */}
//     //       <Route path="game" element={<Game />} />
//     //       <Route path="mgame" element={<GameRoom />} />
//     //       <Route path="tile" element={<Tile />} />

//     //       {/* we want to protect these routes */}
//     //       <Route path="/" element={<Home />} />

//     //       {/* catch all */}
//     //       <Route path="*" element={<Missing />} />
//     //     </Route>
//     //   </Routes>
//     // </Router>



//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     <Router>
//       <nav>
//         <Header />
//       </nav>
//       <Routes>
//         <Route path="login" element={<Login />} /> ok
//         <Route path="register" element={<Register />} /> ok
//         <Route path="game" element={<Game />} /> ok
//         <Route path="mgame" element={<GameRoom />} /> ok
//         <Route path="reset" element={<ResetPW />} /> ok
//         <Route path="tile" element={<Tile />} /> ok
//         {/* <Route path="confirmEmail" element={<ConfirmEmail />} /> */}
//         <Route path="confirmPwd/:id" element={<ConfirmPwd />} />
//         {/* <Route path="/confirmPwd/:id" component={<ConfirmPwd />}/>  */}


//         <Route element={<RequireAuth />} >
//           <Route path="/" element={<Home />} />
//         </Route>

//       </Routes>
//       <hr></hr>
//       <div> cuhk </div>
//     </Router>

//   );
// }

// export default App;

