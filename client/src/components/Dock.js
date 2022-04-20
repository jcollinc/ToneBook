import React, { useState, useEffect } from 'react'
import Metronome from './Metronome'

function Dock({ currentExercise, updateCalendar, setError, exercises, setExercises, timer, setTimer, playing, setPlaying}) {

  const [videoUrl, setVideoUrl] = useState(null)

  useEffect (() => {
    if (currentExercise && currentExercise.video_url){
      let url = getId(currentExercise.video_url)
      setVideoUrl(url)
    }
  }, [currentExercise, exercises])

  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  return (
    <div className="dock">
      {videoUrl ? <iframe 
        id="iframe" 
        title={currentExercise ? currentExercise.name : "video player"} 
        src={`https://www.youtube.com/embed/${videoUrl}`}>
      </iframe> : <div className="iframe-placeholder"></div>}
      <div id="metronome">
        <Metronome
          currentExercise={currentExercise} 
          setError={setError} 
          exercises={exercises} 
          setExercises={setExercises} 
          timer={timer}
          setTimer={setTimer}
          playing={playing}
          setPlaying={setPlaying}
          updateCalendar={updateCalendar}
        />
      </div>
      <div id="exercise-notes-div">
        {currentExercise ? <p id="exercise-notes">{currentExercise.notes}</p> : null}
        <div className="spacer"></div>
      </div>
    </div>
  )
}

export default Dock