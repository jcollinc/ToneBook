import React, { useState } from 'react'

function NewForm({currentUser, showForm, setRoutines, routines, setShowForm}) {

  const [formInput, setFormInput] = useState({})
  const [newError, setNewError] = useState(null)

  function handleNewFormInputs (e) {
    const input = e.target.value
    setFormInput({...formInput, [e.target.name]: input, user_id:currentUser.id})
    console.log(formInput)
  }

  function handleNewFormSubmit (e) {
      e.preventDefault()

      if (showForm) {

          fetch(`/routines`, { 
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(formInput)
          })
          .then(r => r.json())
          .then( r => {
              if(r.ok){
                setRoutines([...routines, r]) 
                setShowForm(false)
              } 
              else {
                setNewError(r.errors)   
              }
          })
      }
  }

  return (
        <form 
        className="form"  
        onSubmit = {handleNewFormSubmit}
        >
        <label>
            Name:
            <input 
                onChange={handleNewFormInputs} 
                type="text" 
                name="name"
                placeholder="Name of routine"
                value={formInput.name}
            />
        </label>
        <label>
            Description:
            <input 
                onChange={handleNewFormInputs} 
                type="text" 
                name="description" 
                placeholder="Description of routine"
                value={formInput.description}
            />
        </label>
        <label>
            Image:
            <input 
                onChange={handleNewFormInputs} 
                type="text" 
                name="image" 
                placeholder="Image (URL) for routine"
                value={formInput.image}
            />
        </label>
        <input 
            className="button" 
            type="submit" 
            value="Submit" 
        />
        <p className="error">{newError ? newError : null}</p>
    </form>
  )
}

export default NewForm