import React, { useEffect } from 'react'
import '../styles/Profile.css';
import { useParams } from "react-router-dom"

function Profile({ setError, setCurrentUser, currentUser }) {
  
  const {userId} = useParams()

  return (
    currentUser ?
    <div className="profile-holder">
      <div id="left-profile-page">
        <img src={currentUser.image} className="main-profile-img"/>
        <div className="profile-details">
          <h1>{currentUser.name}</h1>
          <h3>{currentUser.bio}</h3>
        </div>
        <div className="created-details">
          <h2>Routines created:</h2>
          <h2>{currentUser.routines.length}</h2>
        </div>
        <div className="created-details">
          <h2>Exercises created:</h2>
          <h2>{currentUser.exercises.length}</h2>
        </div>
        <div className="profile-buttons">
        <button 
            id="edit-account" 
            className="button">
              Edit Profile
          </button>
          <button 
            id="delete-account" 
            className="button">
              Delete Account
          </button>
        </div>
      </div>
      <div id="right-profile-page">
        <div className="right-div">THIS IS A DIVIDER</div>
        <div className="right-div">THIS IS A DIVIDER</div>
        <div className="right-div">THIS IS A DIVIDER</div>
      </div>
    </div>
    : null
  )
}

export default Profile