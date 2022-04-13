import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Dock from './Dock'
import ExerciseCard from './ExerciseCard'

function Exercises({ setModal, currentUser, routines }) {

  const {routineId} = useParams()
  const [currentRoutine, setCurrentRoutine] = useState({})
  const [exerciseId, setExerciseId] = useState()
  const [exercises, setExercises] = useState([])
  const [editedEercise, setEditedExercise] = useState()
  const [edit, setEdit] = useState(false)

  useEffect (() => {
    console.log(routines)
    fetch("/exercises")
    .then(r => r.json())
    .then(allEx => setExercises(allEx))
    if(routines){setCurrentRoutine(routines.find(routine => routine.id == routineId))
    console.log(routines.find(routine => routine.id == routineId))
    }
  }, [routines])

  function handleDelete (e) {
    fetch(`/exercises/${e.target.name}`, {
        method: "DELETE"
    }) 
    setExercises(exercise => exercises.filter(exercise => exercise.id != e.target.name))
  }

  function handleImgError (e) {
    e.target.src = "https://wallpaperbat.com/img/278205-music-sheet-wallpaper.jpg"
  }

  let currentExercises

  if (exercises) {
    currentExercises = exercises
      .filter(exercise => exercise.routine_id == routineId)
      .map(exercise => {
        return <ExerciseCard 
            key={exercise.id} 
            exercise={exercise} 
            setModal={setModal}
            handleDelete={handleDelete} 
            setEdit={setEdit}
            edit={edit}
            setExerciseId={setExerciseId}
            setEditedExercise={setEditedExercise}
            currentUser={currentUser}
          />
    })
  } 
 
  return (
    <div className="exercise-page-holder">
      <div className="non-dock-holder">
        <div className="sidebar">
          <div className="sidebar-details">
            <img src={currentRoutine.image} className="sidebar-image" onError={handleImgError}/>
            <h2>{currentRoutine.name}</h2>
            <p>{currentRoutine.description}</p>
          </div>
          <div id="new-exercise">
            <button 
              id="new-exercise"
              title="create new exercise"
              className="button">
                Add Exercise
            </button>
          </div>
        </div>
        <div className="routine-cards-holder">{currentExercises ? currentExercises : null}</div>
      </div>
      <div className="dock-holder">
        <Dock />
      </div>
    </div>
  )
}

export default Exercises