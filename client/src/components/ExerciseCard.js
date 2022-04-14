import React from 'react'

function ExerciseCard({ exercise, setModal, handleDelete, setEdit, edit, setExerciseId, setEditedExercise, currentUser }) {

  function handleEdit (e) {
    setEditedExercise(null)
    setEditedExercise(exercise)
    console.log(exercise)
    setEdit(true)
    setModal(true)
    setExerciseId(e.target.name)
  }

  return (
    <div className="exercise-card">
      <div className="exercise-buttons-div">
        <button 
          name={exercise.id}
          id="edit-exercise" 
          className="button"
          onClick={(e) => handleEdit(e)}
          title="Edit exercise">
            ✎
        </button>
        <button 
          name={exercise.id}
          id="delete-exercise" 
          className="button"
          onClick={handleDelete}
          title="Delete exercise">
            x
        </button>
      </div>
      <div className="exercise-details">
        <h3>{exercise.name}</h3>
        <div id="card-description-div">
          <p id="card-description">Description: {exercise.description}</p>
        </div>
      </div> 
    </div>
  )
}

export default ExerciseCard