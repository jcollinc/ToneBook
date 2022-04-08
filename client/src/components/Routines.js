import React, { useEffect, useState } from 'react'
import '../styles/Routines.css';
import RoutineCard from './RoutineCard'
import NewForm from './NewForm'

function Routines({ currentUser, modal, setModal }) {

  const [routines, setRoutines] = useState([])
  const [exercises, setExercises] = useState([])
  
  useEffect (() => {
    fetch("/routines")
    .then(r => r.json())
    .then(allRo => setRoutines(allRo))

    fetch("/exercises")
    .then(r => r.json())
    .then(allEx => setExercises(allEx))
  }, [setRoutines])

  let userRoutines
  
  if (routines) {
    userRoutines = routines.map(routine => {
    return <RoutineCard key={routine.id} routine={routine} handleDelete={handleDelete} />
    })
  } 

  function handleDelete (e) {
    fetch(`/routines/${e.target.name}`, {
        method: "DELETE"
    }) 
    setRoutines(routines => routines.filter(routine => routine.id != e.target.name))
  }

  return (
    <div>
      <div className="routine-cards-holder">
        {userRoutines}
      </div>
      {/* MODAL */}
      <div className={modal ? 'modal-active' : 'modal'} id='modal'>
        <div className='modal-header'>
          <div className='title'>Create New Routine</div>
          <button onClick={() => setModal(false)}className='close-button'>x</button>
        </div>
        <div className='modal-body'>
          <NewForm 
            setRoutines={setRoutines}
            currentUser={currentUser}
            setModal={setModal}
          />
        </div>
      </div>
      <div id={modal ? 'overlay-active' : 'overlay'}> </div>
    </div>
  )
}

export default Routines