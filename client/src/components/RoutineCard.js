import React from 'react'

function RoutineCard({ routine, handleDelete }) {

  const { name, description, image } = routine

  return (
    <div className="routine-card">
      <div className="routine-buttons-div">
        <button 
          id="edit-routine" 
          className="button"
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
        <p>Description: {description}</p>
        {routine.exercises ? <p>Exercises: {routine.exercises.length}</p> : null}
      </div>
   
    </div>
  )
}

export default RoutineCard