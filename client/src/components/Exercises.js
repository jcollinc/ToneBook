import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Exercises.css';
import Dock from './Dock'
import ExerciseCard from './ExerciseCard'
import ExerciseNew from "./ExerciseNew"
import ExerciseEdit from "./ExerciseEdit"

function Exercises({ setModal, modal, search, currentUser, routines, error, setError, setExerciseCount, exercises, setExercises}) {

  const {routineId} = useParams()
  const [currentExercise, setCurrentExercise] = useState()
  const [currentRoutine, setCurrentRoutine] = useState({})
  const [exerciseId, setExerciseId] = useState()
  const [editedExercise, setEditedExercise] = useState()
  const [edit, setEdit] = useState(false)
  const [timer, setTimer] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect (() => {

    if (exerciseId) {setCurrentExercise(exercises.find(ex => ex.id = exerciseId))}

    setCurrentRoutine(routines.find(routine => routine.id == routineId))
    console.log(routines.find(routine => routine.id == routineId))
    
  }, [routines])

  function handleDelete(e) {
    fetch(`/exercises/${e.target.name}`, {
        method: "DELETE"
    }) 
    setExercises(exercises => exercises.filter(exercise => exercise.id != e.target.name))
    setExerciseCount(exerciseCount => exerciseCount - 1)
  }

  function handleNewExercise() {
    setModal(true)
    setEdit(false)
  }

  function handleExerciseClick (exercise) {
    setCurrentExercise(exercise)
  }

  function handleImgError (e) {
    e.target.src = "https://wallpaperbat.com/img/278205-music-sheet-wallpaper.jpg"
  }

  function updateCalendar() {

    fetch('/calendar_dates')
    .then(r => r.json())
    .then(data => {
      if (!data.includes(new Date().toISOString().split('T')[0])) {
        fetch('/calendar_dates', { 
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({user_id: currentUser.id, date:new Date().toISOString().split('T')[0]})
        })
        .then(r => r.json())
        .then(data => {
          if (data.errors) {
            setError(data.errors)
          }
          else {
          console.log(data)
          }
        })
      }
      else {console.log("already in there")}
    })
  }

  let filteredExercises
  let displayExercises

  if (exercises) filteredExercises = exercises.filter((exercise) => {
    return (
        exercise.name.toUpperCase().includes(search.toUpperCase()) || 
        exercise.description.toUpperCase().includes(search.toUpperCase())
    )
  })

  if (filteredExercises) {
    displayExercises = filteredExercises
      .filter(exercise => exercise.routine_id == routineId)
      .map(exercise => {
        return <ExerciseCard 
          key={exercise.id} 
          exercise={exercise} 
          setModal={setModal}
          handleDelete={handleDelete} 
          setEdit={setEdit}
          handleExerciseClick={handleExerciseClick}
          setExerciseId={setExerciseId}
          setEditedExercise={setEditedExercise}
          currentExercise={currentExercise}
          timer={timer}
          setPlaying={setPlaying}
        />
    })
  } 
 
  return (
    <div className="exercise-page-holder">
      <div className="non-dock-holder">
        <div className="sidebar">
          <div className="sidebar-details">
            <img src={currentRoutine ? currentRoutine.image : "https://wallpaperbat.com/img/278205-music-sheet-wallpaper.jpg"} alt="routine background" className="sidebar-image" onError={handleImgError}/>
            <div className="sidebar-text">
              <h2>{currentRoutine ? currentRoutine.name : "name"}</h2>
              <p>{currentRoutine ? currentRoutine.description : "description"}</p>
            </div>
          </div>
            <button 
              id="new-exercise"
              title="create new exercise"
              onClick={handleNewExercise}
              className="button">
                Add Exercise
            </button>
        </div>
        <div className="exercise-cards-holder">{displayExercises ? displayExercises : null}</div>
      </div>
      <div className="dock-holder">
        <Dock 
          currentExercise={currentExercise} 
          updateCalendar={updateCalendar}
          setError={setError} 
          exercises={exercises} 
          setExercises={setExercises}
          timer={timer}
          setTimer={setTimer}
          playing={playing}
          setPlaying={setPlaying}
        />
      </div>
      <div className={modal ? 'modal-active' : 'modal'} id='modal'>
        <div className='modal-header'>
          <div className='title'>{edit ? `Edit Exercise` : `Create New Exercise`}</div>
          <button onClick={() => {
            setModal(false)
            setEdit(false)
            setEditedExercise(null)
          }}className='close-button'>x</button>
        </div>
        <div className='modal-body'>
          { !edit ? 
          <ExerciseNew 
            setExercises={setExercises}
            routineId={routineId}
            currentUser={currentUser}
            setModal={setModal}
            setExerciseCount={setExerciseCount}
          /> :
          <ExerciseEdit 
            setModal={setModal}
            setExercises={setExercises}
            setEdit={setEdit}
            exercises={exercises}
            exerciseId={exerciseId}
            editedExercise={editedExercise}
          />
          }
        </div>
      </div>
      <div 
        id={modal ? 'overlay-active' : 'overlay'}
        onClick={() => {
          modal ? setModal(false) : setModal(false)
          edit ? setEdit(false) : setEdit(false)
        }}
      >   
      </div>
    </div>
    
  )
}

export default Exercises