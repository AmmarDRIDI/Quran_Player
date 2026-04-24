import { useState } from "react"
import { Link, useLocation } from "react-router"


export const NavBar = () => {

    const location = useLocation().pathname
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    const handleLinkClick = () => {
        setIsMenuOpen(false)
    }


    return (
        <nav className="navbar">
            <div className="navbar-top">
                <div className="navbar-brand" >
                    <span>📓</span>
                    <Link to="/" className="brand-link"> Quran Player</Link>
                </div>

                <button
                    type="button"
                    className={`navbar-toggle ${isMenuOpen ? "open" : ""}`}
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMenuOpen}
                    onClick={handleToggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
                <Link to="/" className={`nav-link ${location === "/" ? "active" : ""}`} onClick={handleLinkClick}>All Songs</Link>
                <Link to="/PlayLists" className={`nav-link ${location === "/PlayLists" ? "active" : ""}`} onClick={handleLinkClick}>PlayLists</Link>
            </div>

        </nav>
    )
}