import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExerciseCard from './ExerciseCard'

function Exercises({setModal, currentUser}) {

  const {routineId} = useParams()
  const [exerciseId, setExerciseId] = useState()
  const [exercises, setExercises] = useState([])
  const [editedEercise, setEditedExercise] = useState()
  const [edit, setEdit] = useState(false)

  useEffect (() => {
    fetch("/exercises")
    .then(r => r.json())
    .then(allEx => setExercises(allEx))
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
    <div>{currentExercises ? currentExercises : null}</div>
  )
}

export default Exercises