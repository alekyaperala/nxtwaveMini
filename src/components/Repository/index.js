import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function Repository() {
  const {username} = useParams()
  const [loading, setLoading] = useState(false)
  const [repositories, setRepositories] = useState([])
  const [error, setError] = useState(null)

  const apiKey = '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'

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://apis2.ccbp.in/gpv/repos/${username}`,
          {
            params: {api_key: apiKey},
          },
        )
        console.log(response.data)
        setRepositories(response.data)
        setError(null)
      } catch (error) {
        setError(error)
        setRepositories([])
      }
      setLoading(false)
    }

    fetchRepositories()
  }, [username])

  return (
    <div>
      <h2>Repositories {username}</h2>
      {loading && <p>Loading...</p>}
      {repositories.map(repo => (
        <div
          className="card"
          key={repo.id}
          style={{border: '1px solid', textAlign: 'center'}}
        >
          <p>{repo.name}</p>
          <p>
            To create a nested list using the web editor on GitHub or a text
            editor thet uses a monospaced font, like Atom, you can aligh your
            list visually{' '}
          </p>
          <p>{repo.language}</p>
          <p>{repo.forks}</p>
        </div>
      ))}
      {error && <p>Failed to fetch repositories</p>}
    </div>
  )
}

export default Repository
