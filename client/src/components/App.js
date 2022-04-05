import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom"
import '../styles/App.css';
import NavBar from "./NavBar"
import Home from "./Home"
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
        currentUser={currentUser}
      </NavBar>
      <Switch>
        <Route exact path="/">
          <Home 
            currentUser={currentUser}
            error={error}
            setError={setError}
            setCurrentUser={setCurrentUser}
          />
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
