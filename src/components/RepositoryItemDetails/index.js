

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function RepositoryItemDetails() {
  const {username, repoName, apiKey} = useParams()
  const [loading, setLoading] = useState(true)
  const [repositoryDetails, setRepositoryDetails] = useState(null)
  const [error, setError] = useState(null)
  // const apiKey = "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";

  const fetchRepositoryDetails = async (username, repoName, apiKey) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}?api_key=${apiKey}`,
      )
      setRepositoryDetails(response.data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRepositoryDetails()
  }, [username, repoName, apiKey])

  const handleTryAgain = () => {
    fetchRepositoryDetails()
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && (
        <div>
          <p>Failed to fetch repository details.</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
      {repositoryDetails && (
        <div>
          <h2>{repositoryDetails.name}</h2>
          <p>Description: {repositoryDetails.description}</p>
        </div>
      )}
    </div>
  )
}

export default RepositoryItemDetails
