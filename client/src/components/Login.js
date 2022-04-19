import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import '../styles/Login.css';

function Login({ error, setError, theme, setCurrentUser, switchTheme }) {
  
  const [user, setUser] = useState("")  
  const [password, setPassword] = useState("")

  let history = useHistory();
    
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
          let interval = setTimeout( function() {e.target.className="login-form"}, 500)
        }
        else {
          setError(null)
          setCurrentUser(data)
          history.push(`/${data.id}/routines`)
        }
      }) 
  }
  
  return (
    <div>
      <div className="login-container">
        <img 
          id="login-logo" 
          src={theme == "light" ? "https://i.ibb.co/0t4gR4Y/Screen-Shot-2022-04-11-at-12-31-51-PM-modified.png" : "https://i.ibb.co/zSX5Ncj/Screen-Shot-2022-04-11-at-12-31-32-PM-modified.png"}
          onClick={switchTheme}
        />
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