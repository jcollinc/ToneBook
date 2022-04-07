import React, { useEffect, useState } from 'react'
import '../styles/Routines.css';
import RoutineCard from './RoutineCard'

function Routines({ currentUser, routines }) {

  let userRoutines = routines.map(routine => {
    return <RoutineCard key={routine.id} routine={routine} />
  }) 

  return (
    <div className="routine-cards-holder">
      {userRoutines}
    </div>
  )
}

export default Routines