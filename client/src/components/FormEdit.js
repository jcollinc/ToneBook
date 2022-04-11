import React, { useState, useEffect } from 'react'

function FormEdit({ setModal, routines, setRoutines, setEdit, routineId, editedRoutine }) {

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
    
    fetch(`/routines/${routineId}`, { 
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
        const updatedRoutines = routines.map(routine => {
          if (routine.id === data.id) {
            return data;
          } else {
            return routine;
          }
        })
        setRoutines(updatedRoutines) 
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
              defaultValue={editedRoutine ? editedRoutine.name : "name"}
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
              defaultValue={editedRoutine ? editedRoutine.description : "description"}
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
              defaultValue={editedRoutine ? editedRoutine.image : "image"}
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

export default FormEdit