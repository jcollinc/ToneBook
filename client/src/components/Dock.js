import React, { useState, useEffect } from 'react'
import Metronome from './Metronome'

function Dock({ currentExercise, error, setError, exercises, setExercises, timer, setTimer, playing, setPlaying}) {

  const [videoUrl, setVideoUrl] = useState(null)

  useEffect (() => {
    if (currentExercise) {console.log(currentExercise)}
    if (currentExercise && currentExercise.video_url){
      let url = getId(currentExercise.video_url)
      console.log(url)
      setVideoUrl(url)
    }
  }, [currentExercise])

  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  return (
    <div className="dock">
      <iframe 
        id="iframe" 
        title={currentExercise ? currentExercise.name : "video player"} 
        src={videoUrl ? `https://www.youtube.com/embed/${videoUrl}` : "https://www.youtube.com/embed/dQw4w9WgXcQ"}>
        </iframe>
      <div id="metronome">
        <Metronome
          currentExercise={currentExercise} 
          error={error} setError={setError} 
          exercises={exercises} 
          setExercises={setExercises} 
          timer={timer}
          setTimer={setTimer}
          playing={playing}
          setPlaying={setPlaying}
        />
      </div>
      <div id="exercise-notes">Notes</div>
    </div>
  )
}

export default Dock