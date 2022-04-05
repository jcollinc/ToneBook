import React, { useEffect } from 'react'
import { NavLink, useHistory } from "react-router-dom"
import '../styles/NavBar.css';

function NavBar() {

  function handleLogin () {
    
  }

  return (
    <div className="nav-bar">
      <div className="nav-text-holder">
        <NavLink to="/" className="nav-text"> 
          <h3 className="nav-text">Home</h3>
        </NavLink>
      </div>
      <div className="nav-text-holder">
        <h3 className="nav-text">Routines</h3>
      </div>
      <div className="nav-text-holder">
        <NavLink to="/signup" className="nav-text"> 
          <h3 className="nav-text">Sign Up</h3>
        </NavLink> 
        <NavLink to="/login" className="nav-text"> 
          <h3 className="nav-text">Log In</h3>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar