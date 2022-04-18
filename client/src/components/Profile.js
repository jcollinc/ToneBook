import React, { useState, useEffect } from 'react'
import '../styles/Profile.css';
import { useParams } from "react-router-dom"

function Profile({ setError, setCurrentUser, currentUser, routineCount, exerciseCount }) {

  const {userId} = useParams()
  const [editProfile, setEditProfile] = useState(false)
  const [name, setName] = useState() 
  const [bio, setBio] = useState()

  useEffect(() => {
    setEditProfile(false)
  }, [])

  function handleEditProfile() {
    setEditProfile(!editProfile)
  }

  function saveProfile() {

    fetch(`/users/${currentUser.id}`, { 
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: name, bio: bio})
    })
    .then(r => r.json())
    .then(data => {
      if (data.errors) {
        console.log(data.errors)
      }
      else {
        setCurrentUser(data)
      }
      setEditProfile(false)
    })
  }

  return (
    currentUser ?
    <div className="profile-holder">
      <div id="left-profile-page">
        <img src={currentUser.image} className="main-profile-img"/>
        <div className="profile-details">
          {editProfile ? 
            <input 
              className="profile-input"
              defaultValue={currentUser.name}
              value={name}
              onChange={(e) => setName(e.target.value)}></input> : <h1>{currentUser.name}</h1>}
          {editProfile ? 
            <input 
              className="profile-input"
              defaultValue={currentUser.bio}
              value={bio}
              onChange={(e) => setBio(e.target.value)}></input> : <h3>Bio: {currentUser.bio}</h3>}
          {editProfile ? 
            <button className = "button" id="save-profile" onClick={saveProfile}>Save</button> : null}
        </div>
        <div className="created-details">
          <h2>Routines created:</h2>
          <h2>{routineCount}</h2>
        </div>
        <div className="created-details">
          <h2>Exercises created:</h2>
          <h2>{exerciseCount}</h2>
        </div>
        <div className="profile-buttons">
        <button 
            id="edit-account" 
            className="button"
            onClick={handleEditProfile}>
              {editProfile ? 'Cancel' : 'Edit Profile'}
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