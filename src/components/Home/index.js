import React from 'react'

const Home = () => (
  <>
    <div>Hello</div>
  </>
)

export default Home
import React, {useState} from 'react'
import axios from 'axios'

import {FaSearch, FaGithub} from 'react-icons/fa'
import {CiLocationOn, CiLink} from 'react-icons/ci'
import {useNavigate} from 'react-router-dom'

function Home() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [inputError, setInputError] = useState(null)

  const apiKey = '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'
  const navigate = useNavigate()

  const fetchUserProfile = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://apis2.ccbp.in/gpv/profile-details/${username}`,
        {
          params: {api_key: apiKey},
        },
      )

      setUserData(response.data)
      setInputError(null) 
      navigate(`/repositories/${username}`) 
    } catch (error) {
      setError(error)
      setInputError('Invalid username. Please enter a valid GitHub username.') 
      setUserData(null) 
    }
    setLoading(false)
  }

  const handleSearch = () => {
    if (username.trim() !== '') {
      navigate(`/repositories/${username}`) 
      fetchUserProfile()
      setUsername('') 
    } else {
      setInputError('Please enter a valid GitHub username')
    }
  }

  const handleTryAgain = () => {
    fetchUserProfile()
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter github username"
      />
      <button onClick={handleSearch}>
        <FaSearch />
      </button>
      {inputError && <p>{inputError}</p>}
      <h6>Github Profile Visualizer</h6>

      {loading && <p>Loading...</p>}
      {userData && (
        <div>
          <h5>{userData.login}</h5>
          <img
            src={userData.avatar_url}
            alt="Avatar"
            style={{borderRadius: '50%'}}
          />
          <p>
            The Webflow Designer brings the power of HTML and CSS into visual
            website design software, allowing creators from agencies to business
            to build custom sites
          </p>
          <div className="d-flex">
            <div>
              <h5>{userData.followers}</h5>
              <p>FOLLOWERS</p>
            </div>
            <div>
              <h5>{userData.following}</h5>
              <p>FOLLOWING</p>
            </div>
            <div>
              <h5>{userData.public_repos}</h5>
              <p>PUBLIC REPOS</p>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <p>Company</p>
              <FaGithub /> <h5>{userData.company}</h5>
            </div>
            <div>
              <p>Company Url</p>
              <CiLink /> <h5>{userData.events_url}</h5>
            </div>
            <div>
              <CiLocationOn />
              <p>Location</p>
              <h5>{userData.location}</h5>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div>
          <p>Something went wrong. Please try again</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  )
}

export default Home
