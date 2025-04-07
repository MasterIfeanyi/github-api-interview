import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Repos = ({username}) => {

    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)


    useEffect(() => {
        if (username) {
          fetchRepos()
        }
    }, [username, page])


    const fetchRepos = async () => {
        if (!username) return
    
        setLoading(true)
        setError(null)
    
        try {
          const perPage = 10
          const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
          )
    
          if (!response.ok) {
            throw new Error("Failed to fetch repositories")
          }
    
          const data = await response.json()
    
          if (data.length < perPage) {
            setHasMore(false)
          }
    
          if (page === 1) {
            setRepos(data)
          } else {
            setRepos((prevRepos) => [...prevRepos, ...data])
          }
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
    }
    
    const loadMore = () => {
        setPage((prevPage) => prevPage + 1)
    }


    if (!username) {
        return (
          <div className="container mt-4">
            <div className="alert alert-info">Please search for a GitHub user first on the home page.</div>
            <Link to="/" className="btn btn-primary">
              Go to Search
            </Link>
          </div>
        )
    }

  return (
    <div className="container mt-4">
      <h2>Repositories for {username}</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {repos.map((repo) => (
          <div className="col-md-6 mb-4" key={repo.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h5>

                {repo.description && <p className="card-text">{repo.description}</p>}

                <div className="d-flex flex-wrap mt-3">
                  {repo.language && <span className="badge bg-primary me-2 mb-2">{repo.language}</span>}

                  <span className="badge bg-secondary me-2 mb-2">
                    <i className="bi bi-star"></i> {repo.stargazers_count} Stars
                  </span>

                  <span className="badge bg-info me-2 mb-2">
                    <i className="bi bi-diagram-2"></i> {repo.forks_count} Forks
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && hasMore && repos.length > 0 && (
        <div className="text-center my-4">
          <button className="btn btn-primary" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}

      {!loading && repos.length === 0 && !error && (
        <div className="alert alert-info">No repositories found for this user.</div>
      )}










    </div>
  )
}

export default Repos