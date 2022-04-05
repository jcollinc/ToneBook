import React, { useEffect } from 'react'
import logo from '../logo.svg';
import { useParams } from "react-router-dom"

function Profile({ setError, setCurrentUser, currentUser }) {
  
  const {userId} = useParams()

  return (
    <div className="header-holder">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="header-details">
          <p>Welcome to ToneBook Music Journal!</p>
          <p>Click on Routines to get started!</p> 
        </div>
      </header>
    </div>
  )
}

export default Profile