import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section>
            <h1>The Lounge</h1>
            <br />
            <p>this is after login page</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Lounge