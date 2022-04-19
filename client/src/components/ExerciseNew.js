import React, { useState } from 'react'

function ExerciseNew({setModal, currentUser, setExercises, routineId, setExerciseCount}) {

  const [formInput, setFormInput] = useState({name: "", description: "", video_url: ""})
  const [newError, setNewError] = useState(null)


  function handleNewFormInputs (e) {
    const input = e.target.value
    setFormInput({...formInput, [e.target.name]: input, routine_id:routineId, is_private:true, bpm:120, user_id:currentUser.id})
  }

  function handleNewFormSubmit (e) {
    e.preventDefault()
    
    fetch(`/exercises`, { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formInput)
    })
    .then(r => r.json())
    .then(data => {
      if (data.errors) {
        setNewError(data.errors)
        setModal(true)
      }
      else {
      console.log(data)
      setExercises(exercises => [...exercises, data]) 
      setExerciseCount(exerciseCount => exerciseCount + 1)
      setModal(false)
      setNewError(false)
      setFormInput({name: "", description: "", video_url: ""})
      }
    })
  }

  return (
    <form 
      className="form"  
      onSubmit = {handleNewFormSubmit}
      >
      <h3 className="form-label">Name</h3>
      <label>
          <input 
              className="form-input"
              onChange={handleNewFormInputs} 
              type="text" 
              name="name"
              placeholder="Name of exercise"
              value={formInput.name}
          />
      </label>
      <h3 className="form-label">Description</h3>
      <label>
          <input 
              className="form-input"
              onChange={handleNewFormInputs} 
              type="text" 
              name="description" 
              placeholder="Description of exercise"
              value={formInput.description}
          />
      </label>
      <h3 className="form-label">Video URL</h3>
      <label>
          <input 
              className="form-input"
              onChange={handleNewFormInputs} 
              type="text" 
              name="video_url" 
              placeholder="Video for exercise (if applicable)"
              value={formInput.video_url}
          />
      </label>
      <input 
          onClick={() => setModal(false)}
          className="button" 
          id="modal-submit"
          type="submit" 
          value="Submit" 
      />
      <p className="error">{newError ? newError : null}</p>
    </form>
  )
}

export default ExerciseNew