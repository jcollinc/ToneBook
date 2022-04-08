import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom"
import '../styles/App.css';
import NavBar from "./NavBar"
import Search from "./Search"
import Profile from "./Profile"
import Login from "./Login"
import SignUp from "./SignUp";
import Routines from "./Routines"

function App() {

  const [update, setUpdate] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [userId, setUserId] = useState()
  const [modal, setModal] = useState(null)
  const [error, setError] = useState(null)
  let history = useHistory()
  console.log(currentUser)

  useEffect (() => {
    fetch("/current_user")
    .then(r => r.json())
    .then(user => {
      user.id ? setUserId(user.id) : history.push("/login")
      user.username ? setCurrentUser(user) : history.push("/login")
    })
  }, [])

  return (
    <div className="App-container">
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      {currentUser ? 
        <Search 
          modal = {modal} 
          setModal= {setModal} 
          setUpdate={setUpdate}
          userId={userId}
        /> : null}
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
          <Routines 
            currentUser={currentUser}
            modal = {modal}
            setModal= {setModal}
            setUpdate={setUpdate}
            update={update}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
