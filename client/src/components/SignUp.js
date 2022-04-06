import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function SignUp({ error, setError, setCurrentUser }) {

  const [user, setUser] = useState("")  
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirm, setConfirm] = useState("")

  let history = useHistory();

  useEffect(() => {
    setError(null)
  }, [])
    
  function handleLogin (e) {
    e.preventDefault()
    
    if (confirm === password) {
      fetch ('/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: user, 
          password: password, 
          name: name,
          image:"https://wallpaperaccess.com/full/709482.jpg",
          bio:"No bio yet!",
          is_private: true
        })
      })
      .then(r => r.json())
      .then(data => {
        if (data.errors) {
          setError(data.errors)
          e.target.className="shake"
          setInterval( function() {e.target.className="login-form"}, 500)
        }
        else {
          setError(null)
          console.log("Sign Up Success")
          setCurrentUser(data)
          history.push(`/${data.id}/profile`)
        }
      }) 
    }
    else {setError("Passwords don't match")}
  }

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-input-div">
              <label>
                <input
                  onChange={(e) => {setName(e.target.value)}}
                  placeholder="Please enter your name"
                  type="text"
                  className="login-input"
                  value = {name}
                />
              </label>
            </div>
            <div className="login-input-div">
              <label>
                <input
                  onChange={(e) => {setUser(e.target.value)}}
                  placeholder="Create a username"
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
                  placeholder="Create a password"
                  type="password"
                  className="login-input"
                  value = {password}
                />
              </label>
            </div>
            <div className="login-input-div">
            <label>
                <input
                  onChange={(e) => {setConfirm(e.target.value)}}
                  placeholder="Confirm password"
                  type="password"
                  className="login-input"
                  value = {confirm}
                />
              </label>
            </div>
            <div className="login-button-div">
              <button 
                type="submit"
                className="button"
              >
                Sign Up
              </button> 
              <p className="error">{error ? error : null}</p>
              <div id="sign-up-prompt">
                <p>Have an account?</p>
                <p onClick={() => history.push("/login")}>Log in</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default SignUp