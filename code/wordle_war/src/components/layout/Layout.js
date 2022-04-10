import { Outlet } from "react-router-dom"
import '../../index.css';
import Header from '../Header';

const Layout = () => {
    return (
        <main className="App">
            <nav>
                <Header />
            </nav>
            <Outlet />
        </main>
    )
}

export default Layout