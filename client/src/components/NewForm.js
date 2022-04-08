import React, { useState } from 'react'

function NewForm({setModal, currentUser, setRoutines, routines}) {

  const [formInput, setFormInput] = useState({})
  const [newError, setNewError] = useState(null)

  function handleNewFormInputs (e) {
    const input = e.target.value
    setFormInput({...formInput, [e.target.name]: input, user_id:currentUser.id})
    console.log(formInput)
  }

  function handleNewFormSubmit (e) {
    e.preventDefault()
    
    fetch(`/routines`, { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formInput)
    })
    .then(r => r.json())
    .then(data => {
      if (data.errors) {
        setNewError(data.errors)
        console.log(data.errors)
      }
      else {
      console.log(data)
      setRoutines(routines => [...routines, data]) 
      setModal(false)
      }
    })
  }

  return (
    <form 
      className="form"  
      onSubmit = {handleNewFormSubmit}
      >
      <label>
          <input 
              className="form-input"
              onChange={handleNewFormInputs} 
              type="text" 
              name="name"
              placeholder="Name of routine"
              value={formInput.name}
          />
      </label>
      <label>
          <input 
              className="form-input"
              onChange={handleNewFormInputs} 
              type="text" 
              name="description" 
              placeholder="Description of routine"
              value={formInput.description}
          />
      </label>
      <label>
          <input 
              className="form-input"
              onChange={handleNewFormInputs} 
              type="text" 
              name="image" 
              placeholder="Image (URL) for routine"
              value={formInput.image}
          />
      </label>
      <input 
          onClick={() => setModal(false)}
          className="button" 
          type="submit" 
          value="Submit" 
      />
      <p className="error">{newError ? newError : null}</p>
    </form>
  )
}

export default NewForm