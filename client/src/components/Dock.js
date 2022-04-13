import React from 'react'
import Metronome from './Metronome'

function Dock() {
  return (
    <div className="dock">
      <div id="iframe">iFrame</div>
      <div id="metronome">
       <Metronome />
      </div>
      <div id="exercise-notes">Notes</div>
    </div>
  )
}

export default Dock