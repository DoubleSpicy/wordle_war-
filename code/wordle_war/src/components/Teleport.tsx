
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



function App() {
  return (

      <div> 
        傳送門
        <br />
        <Link to="/Login"> Login</Link>
        <br />
        <Link to="/register"> Register</Link>
        <br />
        <Link to="/reset"> Reset</Link>
        <br />
        <Link to="/dashboard"> Dashboard</Link>
        <br />
        <Link to="/*"> Missing</Link>
        <br />
         </div>

  );
}

export default App;


