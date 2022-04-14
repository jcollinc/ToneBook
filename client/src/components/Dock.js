import React, { useState } from 'react'
import Metronome from './Metronome'

function Dock({ currentExercise }) {

  return (
    <div className="dock">
      <div id="iframe">iFrame</div>
      <div id="metronome">
       <Metronome currentExercise={currentExercise} />
      </div>
      <div id="exercise-notes">Notes</div>
    </div>
  )
}

export default Dock