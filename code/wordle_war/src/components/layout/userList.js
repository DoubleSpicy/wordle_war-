//https://github.com/gitdagray/react_persist_login/blob/main/src/hooks/useRefreshToken.js
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserList = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List:</h2>
            <hr />
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>
                            {i + 1}.
                            userid: {user?._id}
                            <br />
                            userName: {user?.username}
                            <br />
                            userEmail: {user?.email}
                            <br />
                            {/* {(user?.roles["Admin"]) === 5150 ? <h1>admin</h1> :<h1></h1>}
                            {(user?.roles["Editor"]) === 1984 ? <h1>Editor</h1> :<h1></h1>}
                            {(user?.roles["User"]) === 2001 ? <h1>User</h1> :<h1></h1>} */}
                            {(user?.roles["Admin"]) === 5150 ? <h1>Admin</h1> : 
                            (user?.roles["Editor"]) === 1984 ? <h2>Editor</h2> :
                            (user?.roles["User"]) === 2001 ? <h3>User</h3> :<h1></h1>}

                            <hr />
                        </li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default UserList;