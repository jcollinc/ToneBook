import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/Exercises.css';
import Dock from './Dock'
import ExerciseCard from './ExerciseCard'
import ExerciseNew from "./ExerciseNew"
import ExerciseEdit from "./ExerciseEdit"

function Exercises({ setModal, modal, currentUser, routines }) {

  const {routineId} = useParams()
  const [currentExercise, setCurrentExercise] = useState()
  const [currentRoutine, setCurrentRoutine] = useState({})
  const [exerciseId, setExerciseId] = useState()
  const [exercises, setExercises] = useState([])
  const [editedExercise, setEditedExercise] = useState()
  const [edit, setEdit] = useState(false)

  useEffect (() => {
    console.log(routines)
    fetch("/exercises")
    .then(r => r.json())
    .then(allEx => {
      setExercises(allEx)
      if (exerciseId) {setCurrentExercise(allEx.find(ex => ex.id = exerciseId))}
    })
    if(routines){setCurrentRoutine(routines.find(routine => routine.id == routineId))
    console.log(routines.find(routine => routine.id == routineId))
    }
  }, [routines, exerciseId])

  function handleDelete(e) {
    fetch(`/exercises/${e.target.name}`, {
        method: "DELETE"
    }) 
    setExercises(exercise => exercises.filter(exercise => exercise.id != e.target.name))
  }

  function handleNewExercise() {
    setModal(true)
    setEdit(false)
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
            <button 
              id="new-exercise"
              title="create new exercise"
              onClick={handleNewExercise}
              className="button">
                Add Exercise
            </button>
        </div>
        <div className="exercise-cards-holder">{currentExercises ? currentExercises : null}</div>
      </div>
      <div className="dock-holder">
        <Dock exercise={currentExercise}/>
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
            setEdit={setEdit}
            edit={edit}
            setExercises={setExercises}
            routineId={routineId}
            currentUser={currentUser}
            setModal={setModal}
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
          modal ? setModal(false) : setModal(true)
          edit ? setEdit(false) : setEdit(true)
        }}
      >   
      </div>
    </div>
    
  )
}

export default Exercises