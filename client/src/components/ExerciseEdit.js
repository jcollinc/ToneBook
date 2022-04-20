import React, { useState, useEffect } from 'react'

function ExerciseEdit({ setModal, exercises, setExercises, setEdit, exerciseId, editedExercise, setCurrentExercise }) {

  const [formInput, setFormInput] = useState({name: editedExercise.name, description: editedExercise.description, video_url: editedExercise.video_url, notes: editedExercise.notes})
  const [editError, setEditError] = useState(null)

  useEffect (() => {
    
  })

  function handleEditFormInputs (e) {
    const input = e.target.value
    setFormInput({...formInput, [e.target.name]: input})
    console.log(formInput)
  }

  function handleEditFormSubmit (e) {
    e.preventDefault()
    
    fetch(`/exercises/${exerciseId}`, { 
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formInput)
    })
    .then(r => r.json())
    .then(data => {
      if (data.errors) {
        setEditError(data.errors)
        setModal(true)
      }
      else {
        setCurrentExercise(data)
        const updatedexercises = exercises.map(routine => {
          if (routine.id === data.id) {
            return data;
          } else {
            return routine;
          }
        })
        setExercises(updatedexercises) 
        setModal(false)
        setEdit(false)
        setEditError(false)
      }
    })
  }

  return (
    <form 
      className="form"  
      onSubmit = {handleEditFormSubmit}
      >
      <h3 className="form-label">Name</h3>
      <label>
          <input 
              className="form-input"
              onChange={handleEditFormInputs} 
              type="text" 
              name="name"
              value={formInput.name}
          />
      </label>
      <h3 className="form-label">Description</h3>
      <label>
          <input 
              className="form-input"
              onChange={handleEditFormInputs} 
              type="text" 
              name="description" 
              value={formInput.description}
          />
      </label>
      <h3 className="form-label">Video URL</h3>
      <label>
          <input 
              className="form-input"
              onChange={handleEditFormInputs} 
              type="text" 
              name="video_url" 
              value={formInput.video_url}
          />
      </label>
      <h3 className="form-label">Notes</h3>
      <label>
          <input 
              id="notes-input"
              className="form-input"
              onChange={handleEditFormInputs} 
              type="text" 
              name="notes" 
              value={formInput.notes}
          />
      </label>
      <input 
          onClick={() => setModal(false)}
          className="button" 
          id="modal-submit"
          type="submit" 
          value="Submit" 
      />
      <p className="error">{editError ? editError : null}</p>
    </form>
  )
}

export default ExerciseEdit