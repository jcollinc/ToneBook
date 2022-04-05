import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import '../styles/Login.css';

function Login({ error, setError, setCurrentUser }) {
  
  const [user, setUser] = useState("")  
  const [password, setPassword] = useState("")

  let history = useHistory();

  useEffect (() => {
    setError(null)
    fetch("/current_user")
    .then(r => r.json())
    .then(data => {
      data ? setCurrentUser(data) : console.log("No login registered") 
    })
  }, [])
    
  function handleLogin (e) {
    e.preventDefault()
    
    fetch ('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: user, password: password})
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
          e.target.className="shake"
          setInterval( function() {e.target.className="login-form"}, 500)
        }
        else {
          setError(null)
          console.log("Login Success")
          history.push("/")
          setCurrentUser(data)
        }
      }) 
  }

  
  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-input-div">
            <label>
                <input
                  onChange={(e) => {setUser(e.target.value)}}
                  placeholder="Enter username"
                  type="text"
                  className="login-input"
                  value = {user}
                />
              </label>
            </div>
            <div className="login-input-div">
              <label>
                <input
                  onChange={(e) => {setPassword(e.target.value)}}
                  placeholder="Enter password"
                  type="password"
                  className="login-input"
                  value = {password}
                />
              </label>
            </div>
            <div className="login-button-div">
              <button 
                type="submit"
                className="button"
              >
                Log in
              </button> 
              <p className="error">{error ? error : null}</p>
              <div id="sign-up-prompt">
                <p>New here?</p>
                <p onClick={() => history.push("/signup")}>Sign Up</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login