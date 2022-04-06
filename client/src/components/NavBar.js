import React, { useEffect } from 'react'
import { NavLink, useHistory } from "react-router-dom"
import '../styles/NavBar.css';

function NavBar( { currentUser, setCurrentUser }) {

  let history = useHistory()

  useEffect (() => {
    fetch("/current_user")
    .then(r => r.json())
    .then(data => {
      data.username ? setCurrentUser(data) : setCurrentUser(null)
    })
  }, [setCurrentUser])

  function handleLogout () {
    fetch(`/logout`, {
        method: "DELETE"
    }) 
    .then( r => { 
      history.push("/login") 
      setCurrentUser(null) 
    })
  }

  return (

    currentUser 
    ? 
    <div className="nav-bar">
      <div className="nav-text-holder">
        <NavLink to={`/${currentUser.id}/profile`} className="nav-text"> 
          <h3 className="nav-text">Profile</h3>
        </NavLink>
      </div>
      <div className="nav-text-holder">
        <NavLink to={`/${currentUser.id}/routines`} className="nav-text"> 
          <h3 className="nav-text">Routines</h3>
        </NavLink>
      </div>
      <div className="nav-text-holder">
        <h3 className="nav-text"
            onClick={handleLogout}
        >Log Out</h3>
      </div>
    </div>
    :
    <div className="nav-bar">
    <div className="nav-text-holder">
    </div>
    <div className="nav-text-holder">
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