import React from 'react'
import '../styles/NavBar.css';

function NavBar() {
  return (
    <div className="nav-bar">
      <div className="nav-text-holder">
        <h3 className="nav-text">Home</h3>
      </div>
      <div className="nav-text-holder">
        <h3 className="nav-text">Routines</h3>
      </div>
      <div className="nav-text-holder">
        <h3 className="nav-text">Sign Up</h3>
        <h3 className="nav-text">Sign In</h3>
      </div>
    </div>
  )
}

export default NavBar