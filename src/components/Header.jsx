import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import "./Header.css"
import { Sun, Moon } from "lucide-react"

const Header = () => {

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
          document.body.classList.add("dark", "bg-dark", "text-light")
        } else {
          document.body.classList.remove("dark", "bg-dark", "text-light")
        }
    }, [darkMode])


  return (
    <header>
        <nav className="navbar navbar-dark py-3 navbar-expand-lg sticky-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    GitHub Profile Search
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="repos" className="nav-link">Repos</Link>
                        </li>
                    </ul>

                    <button className={`btn ${darkMode ? "btn-light" : "btn-dark"}`} onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header