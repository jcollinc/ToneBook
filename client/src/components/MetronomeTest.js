import React, { Component } from 'react';
import '../styles/Metronome.css';
import mHi from '../sounds/mHi.mp3';
import mLo from '../sounds/mLo.mp3';

class Metronome extends Component {
  
  constructor(props) {
    super(props);

    var errors
    console.log(props)

    this.state = {
      playing: false,
      count: 0,
      bpm: props.currentExercise ? props.currentExercise.bpm : null,
      beatsPerMeasure: 4,
      currentExercise: props.currentExercise,
      errors: errors,
      id: props.currentExercise ? props.currentExercise.id : null
    };

    // Create Audio objects with the files Webpack loaded,
    // and we'll play them later.
    this.mHi = new Audio(mHi);
    this.mLo = new Audio(mLo);
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if(count % beatsPerMeasure === 0) {
      this.mHi.play();
      this.mHi.currentTime = 0;
    } else {
      this.mLo.play();
      this.mLo.currentTime = 0;
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  startStop = () => {
    if(this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
        // Play a click "immediately" (after setState finishes)
      }, this.playClick);
    }
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if(this.state.playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    }

  }

  handleSaveBpm = (bpm, id) => {

    const { errors } = this.state;

    if (id && bpm) {
      fetch(`/exercises/${id}`, { 
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
          body: JSON.stringify({bpm: bpm})
      })
      .then(r => r.json())
      .then(data => {
        if (data.errors) {
          errors = data.errors
        }
        else {console.log("ok!")}
      })
    }

    console.log(id, bpm)
  }

  render() {
    const { playing, bpm, id } = this.state;

    return (
      <div className="metronome">
        <button onClick={(e) => this.handleSaveBpm(e.target.name, e.target.id)} name={bpm} className="button" id={id}>
          Save BPM
        </button>
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="50"
            max="300"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop} className="button">
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;