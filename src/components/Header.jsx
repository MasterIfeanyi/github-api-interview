import {useState} from 'react'
import axios from 'axios';
import { FiMapPin, FiLink } from "react-icons/fi"
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import "./Header.css"

const Header = () => {


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
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header