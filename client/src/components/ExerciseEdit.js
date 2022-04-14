import React, { useState, useEffect } from 'react'

function ExerciseEdit({ setModal, exercises, setExercises, setEdit, exerciseId, editedExercise }) {

  const [formInput, setFormInput] = useState({})
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
        console.log(data.errors)
        setModal(true)
      }
      else {
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
              defaultValue={editedExercise ? editedExercise.name : "name"}
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
              defaultValue={editedExercise ? editedExercise.description : "description"}
              value={formInput.description}
          />
      </label>
      <h3 className="form-label">Image</h3>
      <label>
          <input 
              className="form-input"
              onChange={handleEditFormInputs} 
              type="text" 
              name="image" 
              defaultValue={editedExercise ? editedExercise.image : "image"}
              value={formInput.image}
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