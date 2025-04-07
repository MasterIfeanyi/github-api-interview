import {useState} from 'react'
import axios from 'axios';
import { FiMapPin, FiLink } from "react-icons/fi"
import './User.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const User = () => {

    const { username, setUsername, userData, setUserData } = useAuth()


    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setUserData(null);
        try {
          const response = await axios.get(`https://api.github.com/users/${username}`);
          if (!response) {
            throw new Error("User not found")
          }
          setUserData(response.data);
        } catch (err) {
          setError('User not found. Please enter a valid GitHub username.');
          setUserData(null);
        }
    };



    return (
        <>
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
    
          <div className="container">
          
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="form-control me-2"
                required
              />
              <button className="btn btn-primary" type="submit" onClick={handleSearch}>Search</button>
            </form>
            
    
    
            {error && <div className="alert alert-danger">{error}</div>}
    
    
            {userData && (
              <div className="">
    
                <div className="user-header">
                  <img src={userData.avatar_url || "/placeholder.svg"} alt={`${userData.name}'s avatar`} className="avatar" />
                  <div>
                    <h2 className="user-name">{userData.name}</h2>
                    <p className="user-login">{userData.login}</p>
                  </div>
                </div>
    
                {/* user bio */}
                {userData.bio && <p className="user-bio">{userData.bio}</p>}
    
    
                <div className="user-stats">
                  {/* public repos */}
                  <div className="stat">
                    <div className="stat-value">{userData.public_repos}</div>
                    <p className="stat-label">Repositories</p>
                  </div>
    
                  {/* followers */}
                  <div className="stat">
                    <div className="stat-value">{userData.followers}</div>
                    <p className="stat-label">Followers</p>
                  </div>
    
                  {/* following */}
                  <div className='stat'>
                    <div className="stat-value">{userData.following}</div>
                    <p className="stat-label">Following</p>
                  </div>
    
                  {/* gists / stars */}
                  <div className='stat'>
                    <div className="stat-value">{userData.public_gists}</div>
                    <p className="stat-label">Stars</p>
                  </div>
                </div>
    
                {/* view profile button */}
                <div className="user-details">
                  {userData.location && (
                    <div className="detail-item">
                      <FiMapPin className="detail-icon" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.blog && (
                    <div className="detail-item">
                      <FiLink className="detail-icon" />
                      <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                        {userData.blog}
                      </a>
                    </div>
                  )}
                  {userData.html_url && ( <a href={userData.html_url} className="btn btn-info" target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a> )}
                </div>
    
              </div>
            )}
          </div>
        </>
    )
}

export default User