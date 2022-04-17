import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom"
import '../styles/App.css';
import NavBar from "./NavBar"
import Search from "./Search"
import Profile from "./Profile"
import Login from "./Login"
import SignUp from "./SignUp";
import Routines from "./Routines"
import Exercises from "./Exercises"

function App() {

  const [update, setUpdate] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [userId, setUserId] = useState()
  const [routines, setRoutines] = useState([])
  const [exercises, setExercises] = useState([])
  const [routineId, setRoutineId] = useState()
  const [modal, setModal] = useState(null)
  const [edit, setEdit] = useState(false)
  const [error, setError] = useState(null)
  const [routineCount, setRoutineCount] = useState()
  const [exerciseCount, setExerciseCount] = useState()
  
  let history = useHistory()

  useEffect (() => {
    fetch("/current_user")
    .then(r => r.json())
    .then(user => {
      user.id ? setUserId(user.id) : history.push("/login")
      user.username ? setCurrentUser(user) : history.push("/login")
    })

    fetch("/routines")
    .then(r => r.json())
    .then(allRo => {
      setRoutines(allRo)
    })
    
    fetch("/exercises")
    .then(r => r.json())
    .then(allEx => {
      setExercises(allEx)
    })

    setError(null)
  }, [])

  useEffect (() => {
    setExerciseCount(exercises.length)
    setRoutineCount(routines.length)
  }, [exercises, routines])

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
          setEdit={setEdit}
          edit={edit}
        /> : null}
      <Switch>
        <Route exact path="/:userId/profile">
          <Profile 
            currentUser={currentUser}
            error={error}
            setError={setError}
            setCurrentUser={setCurrentUser}
            exerciseCount={exerciseCount}
            routineCount={routineCount}
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
            modal={modal}
            setModal={setModal}
            edit={edit}
            setEdit={setEdit}
            routineId={routineId}
            routines={routines}
            setRoutines={setRoutines}
            setRoutineId={setRoutineId}
            exercises={exercises}
            setExercises={setExercises}
          />
        </Route>
        <Route exact path="/:userId/routines/:routineId">
          <Exercises
            exercises={exercises}
            setExercises={setExercises}
            currentUser={currentUser}
            modal={modal}
            setModal={setModal}
            routines={routines}
            setError={setError}
            error={error}
            setExerciseCount={setExerciseCount}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
