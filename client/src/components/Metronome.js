import React, { useState, useEffect, useRef } from 'react'
import '../styles/Metronome.css';
import mHi from '../sounds/mHi.mp3';
import mLo from '../sounds/mLo.mp3';

function Metronome({ updateCalendar, currentExercise, setError, exercises, setExercises, timer, setTimer, playing, setPlaying}) {
 
  const [bpm, setBpm] = useState(120)
  const [refBpm, setRefBpm] = useState(120)
  const [beats, setBeats] = useState(4)

  const hi = new Audio(mHi);
  const lo = new Audio(mLo);
  const count = useRef(0)

  useEffect(() => {
    if(currentExercise){
      setBpm(currentExercise.bpm)
      setRefBpm(currentExercise.bpm)
    }
  }, [currentExercise])

  function playClick() {

    if (count.current % beats === 0) {
      hi.play()
      hi.currentTime = 0
    }

    else if (count.current === beats) {
      lo.play()
      count.current = 0
    }

    else {
      lo.play()
      lo.currentTime = 0
    }

    // Keep track of which beat we're on
    count.current = ((count.current + 1) % beats)

  }

  function startStop() {

    if (playing) {
      // Stop the timer
      clearInterval(timer);
      setPlaying(false)
    } 
    else {
      // Start a timer with the current BPM
      setTimer(setInterval(playClick, (60 / bpm * 1000)));
      count.current = 0
      setPlaying(true)
      playClick()
    }
  }

  function handleBpmChange(e) {
    setBpm(e.target.value)
   
    if (playing) {
       // Stop the old timer and start a new one
       clearInterval(timer);
       setTimer(setInterval(playClick, (60 / e.target.value) * 1000))
       count.current = 0
       setBpm(e.target.value)
      // Set the new BPM, and reset the beat counter
    }
    else {setBpm(e.target.value)}
  }

  function handleSaveBpm(bpm, id) {

    setRefBpm(bpm)

    if (id && bpm) {
      fetch(`/exercises/${id}`, { 
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
          body: JSON.stringify({bpm: bpm})
      })
      .then(r => r.json())
      .then(data => {
        if (data.errors) {
          setError(data.errors)
        }
        else {
          const updatedexercises = exercises.map(routine => {
            if (routine.id === data.id) {
              return data;
            } else {
              return routine;
            }
          })
          setExercises(updatedexercises) 
          setError(false)
        }
      })
    }
    updateCalendar()
  }

  return (
    <div className="metronome">
      {refBpm != bpm && currentExercise ? <button 
        onClick={(e) => handleSaveBpm(e.target.name, e.target.id)} 
        name={bpm} 
        className="button" 
        id={currentExercise ? currentExercise.id : null}>
          Save BPM
      </button> : null}
      <div className="bpm-slider">
        <p className="bpm-display">{bpm} BPM</p>
        <input
          type="range"
          min="50"
          max="300"
          value={bpm}
          onChange={handleBpmChange} />
      </div>
      <button onClick={startStop} className="button" id="start-met">
        {playing ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}

export default Metronome