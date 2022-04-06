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
          <h2>{currentUser.name}</h2>
          <p>{currentUser.bio}</p>
        </div>
      </div>
      <div id="right-profile-page">
        <p>RIGHT</p>
      </div>
    </div>
    : null
  )
}

export default Profile