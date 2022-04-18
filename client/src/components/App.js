import React, { useState, useEffect } from "react";
import useLocalStorage from 'use-local-storage'
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
  const [search, setSearch] = useState("")
  
  let history = useHistory()

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

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
    <div className="App-container" data-theme={theme}>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        theme={theme}
      />
      {currentUser ? 
        <Search         
          switchTheme={switchTheme}
          theme={theme}
          setModal= {setModal} 
          userId={userId}
          setEdit={setEdit}
          search={search}
          setSearch={setSearch}
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
            setCurrentUser={setCurrentUser}
            theme={theme}
            switchTheme={switchTheme}
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
            search={search}
            setEdit={setEdit}
            routineId={routineId}
            routines={routines}
            setRoutines={setRoutines}
            setRoutineId={setRoutineId}
            exercises={exercises}
            setExercises={setExercises}
            setSearch={setSearch}
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
            exerciseCount={exerciseCount}
            setExerciseCount={setExerciseCount}
            search={search}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
