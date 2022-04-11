import { Link } from "react-router-dom"
import UserList from "./userList";
import AdminChangePw from "./adminChangePw";
// import Refresh from "./refresh"
const Admin = () => {
    return (
        <div class="center">
            <section>
                <h1>Admins Page</h1>
                <br />
                <p>this is admin page</p>
                <UserList />
                <AdminChangePw />
                {/* <Refresh /> */}
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </section>
        </div>

    )
}

export default Admin