import React, { useState } from 'react'
import '../styles/Metronome.css';


function Metronome() {

  const [bpm, setBpm] = useState(100)
  const [playing, setPlaying] = useState(false)

  function handleBpmChange(e) {
    setBpm(e.target.value)
  }

  return (
    <div className="metronome">
      <div className="bpm-slider">
        <div>{bpm} BPM</div>
          <input
          onChange={handleBpmChange}
            type="range"
            min="50"
            max="300"
            value={bpm} />
      </div>
      <button className="button">
        {playing ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default Metronome