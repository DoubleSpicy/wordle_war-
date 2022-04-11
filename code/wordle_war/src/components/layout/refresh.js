// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useRefreshToken from "../hooks/useRefreshToken";
// import useAuth from '../hooks/useAuth';
// import axios from '../../api/axios';

// const Refresh = () => {
//     const [refresh1, setRefresh] = useState();
//     const axiosPrivate = useAxiosPrivate();
//     const navigate = useNavigate();
//     const location = useLocation();


//     const useRefreshToken = () => {
//         const { setAuth } = useAuth();
    
//         const refresh = async () => {
//             const response = await axios.get('/refresh', {
//                 withCredentials: true
//             });
//             setAuth(prev => {
//                 return {
//                     ...prev,
//                     roles: response.data.roles,
//                     accessToken: response.data.accessToken
//                 }
//             });
//             return response.data.accessToken;
//         }
//         return refresh;
//     };
   


//     return (

//         <div>
//             {useRefreshToken()}
//         </div>

//     );


// };

// export default Refresh;