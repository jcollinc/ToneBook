import React, { useEffect } from 'react'
import logo from '../logo.svg';
import { useHistory } from "react-router-dom"

function Home({ setError, setCurrentUser, currentUser }) {

  let history = useHistory()

  useEffect (() => {
    setError(null)
    fetch("/current_user")
    .then(r => r.json())
    .then(data => {data ? setCurrentUser(data) : console.log("Aie aie aie!")})
    if (!currentUser) {history.push("/login")}
  }, [])
  
  
  return (
    <div className="header-holder">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="header-details">
          <p>
            Welcome to ToneBook Music Journal
          </p>
          <p>New here?</p> 
          <h4>Sign Up</h4>
        </div>
      </header>
    </div>
  )
}

export default Home