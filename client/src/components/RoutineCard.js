import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function RoutineCard({ currentUser, setRoutineId, routine, setSearch, handleDelete, setEdit, setModal, setEditedRoutine}) {

  const { name, description, image } = routine

  function handleEdit (e) {
    setEditedRoutine(null)
    setEditedRoutine(routine)
    console.log(routine)
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
          onClick={(e) => handleEdit(e)}
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
      <NavLink to={`/${currentUser.id}/routines/${routine.id}`} className="nav-text"> 
        <div className="routine-details" onClick={() => setSearch("")}>
          <h3>{name}</h3>
          <div id="card-description-div">
            <p id="card-description">Description: {description}</p>
          </div>
          {routine.exercises ? <p>Exercises: {routine.exercises.length}</p> : null}
        </div> 
      </ NavLink>
    </div>
 
  )
}

export default RoutineCard