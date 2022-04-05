import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom"
import logo from '../logo.svg';
import '../styles/App.css';
import NavBar from "./NavBar"
import Login from "./Login"
import SignUp from "./SignUp";

function App() {

  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)

  useEffect (() => {
    fetch("/current_user")
    .then(r => r.json())
    .then(data => {
      data ? setCurrentUser(data) : console.log("No login registered") 
    })
  }, [])

  return (
    <div className="App-container">
      <NavBar>

      </NavBar>
      <Switch>
        <Route exact path="/">
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
        </Route>
        <Route exact path="/login">
          <Login 
            error={error}
            setError={setError}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        <Route exact path="/signup">
          <SignUp 
           error={error}
           setError={setError}
           setCurrentUser={setCurrentUser}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
