import { Link,  useLocation} from "react-router"


export const NavBar = () => {

    const location = useLocation().pathname


    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span>📓</span>
                <Link to="/" className="brand-link"> Quran Player</Link>
            </div>

            <div>
                <Link to="/" className={`nav-link ${ location === "/" ? "active" : ""}`}>All Songs</Link>
                <Link to="/PlayLists" className={`nav-link ${ location === "/PlayLists" ? "active" : ""}`}>PlayLists</Link>
            </div>

        </nav>
    )
}