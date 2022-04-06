import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom"
import '../styles/App.css';
import NavBar from "./NavBar"
import Profile from "./Profile"
import Login from "./Login"
import SignUp from "./SignUp";
import Routines from "./Routines"

function App() {

  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)
  let history = useHistory()

  useEffect (() => {
    fetch("/current_user")
    .then(r => r.json())
    .then(data => {
      data.username ? setCurrentUser(data) : history.push("/login")
    })
  }, [])

  return (
    <div className="App-container">
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Switch>
        <Route exact path="/:userId/profile">
          <Profile 
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
            currentUser={currentUser}
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
        <Route exact path="/:userId/routines">
          <Routines />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
