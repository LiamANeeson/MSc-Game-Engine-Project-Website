import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Game Engine</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tutorial">Tutorial</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/download">Download</Link>
          </li>
        </ul>
        <span className="navbar-text">
        </span>
      </div>
    </nav>
  )
}

export default Navbar