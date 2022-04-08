import React, { useEffect, useState } from 'react'
import '../styles/Routines.css';
import RoutineCard from './RoutineCard'
import NewForm from './NewForm'

function Routines({ currentUser, routines, modal, setModal }) {

  let userRoutines
  
  if (routines) {
    userRoutines = routines.map(routine => {
    return <RoutineCard key={routine.id} routine={routine} />
    })
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
          <NewForm />
        </div>
      </div>
      <div id={modal ? 'overlay-active' : 'overlay'}> </div>
    </div>
  )
}

export default Routines