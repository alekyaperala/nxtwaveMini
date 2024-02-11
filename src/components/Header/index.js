import React, {useState, useRef, useEffect} from 'react'
import './index.css'
import {NavLink} from 'react-router-dom'

const Header = () => {
  const [click, setClick] = useState(false)
  const navRef = useRef(null)
  const menuButtonRef = useRef(null)

  const handleClick = () => setClick(!click)
  const Close = () => setClick(false)

  useEffect(() => {
    const handleOutsideClick = event => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        Close()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (click) {
      menuButtonRef.current.focus()
    }
  }, [click])

  return (
    <div>
      {click && <div className="main-container" onClick={() => Close()} />}

      <nav className="navbar" aria-labelledby="main-navigation" ref={navRef}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Github Profile Visualizer
          </NavLink>
          <ul
            className={click ? 'nav-menu active' : 'nav-menu'}
            id="main-navigation"
          >
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/repositories"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Repositories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/analysis"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Analysis
              </NavLink>
            </li>
          </ul>
          <button
            className="nav-icon"
            onClick={handleClick}
            tabIndex={0}
            ref={menuButtonRef}
            aria-label="Toggle menu"
            aria-expanded={click}
          >
            <i className={click ? 'fa fa-times' : 'fa fa-bars'}></i>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Header
