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
    fetch("/exercises")
    .then(r => r.json())
    .then(allEx => setExercises(allEx))
    setCurrentRoutine(routines.find(routine => routine.id == routineId))
    console.log(routines.find(routine => routine.id == routineId))
  }, [])

  function handleDelete (e) {
    fetch(`/exercises/${e.target.name}`, {
        method: "DELETE"
    }) 
    setExercises(exercise => exercises.filter(exercise => exercise.id != e.target.name))
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
            <img src={currentRoutine.image} className="sidebar-image"/>
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
      <Dock />
    </div>
  )
}

export default Exercises