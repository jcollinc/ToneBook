import React, { useState } from 'react'

function RoutineCard({ setRoutineId, routine, handleDelete, edit, setEdit, setModal, setEditedRoutine}) {

  const { name, description, image } = routine

  function handleEdit (e) {
    setEditedRoutine(null)
    setEditedRoutine(routine)
    setEdit(true)
    setModal(true)
    setRoutineId(e.target.name)
  }

  return (
    <div className="routine-card">
      <div className="routine-buttons-div">
        <button 
          name={routine.id}
          id="edit-routine" 
          className="button"
          onClick={handleEdit}
          title="Edit routine">
            ✎
        </button>
        <button 
          name={routine.id}
          id="delete-routine" 
          className="button"
          onClick={handleDelete}
          title="Delete routine">
            x
        </button>
      </div>
      <div className="routine-details">
        <h3>{name}</h3>
        <div id="card-description-div">
          <p id="card-description">Description: {description}</p>
        </div>
        {routine.exercises ? <p>Exercises: {routine.exercises.length}</p> : null}
      </div>
    </div>
  )
}

export default RoutineCard