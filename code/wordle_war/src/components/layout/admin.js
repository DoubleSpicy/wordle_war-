import { Link } from "react-router-dom"
import UserList from "./userList";
import AdminChangePw from "./adminChangePw";
const Admin = () => {
    return (
        <div class="center">
            <section>
                <h1>Admins Page</h1>
                <br />
                <p>this is admin page</p>
                <UserList />
                <AdminChangePw />
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        </div>

    )
}

export default Admin