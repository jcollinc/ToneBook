import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Nav.css';

function Search({ switchTheme, theme, setModal, userId, setEdit }) {

  let history = useHistory()

  return (
    <div id="search-div">
      <div>
        <button 
          id="new-routine"
          title="create new routine"
          onClick={() => {
            setModal(true)
            setEdit(false)
            history.push(`/${userId}/routines`)
          }}
          className="button">
            Create Routine
        </button>
        <input 
          id="search-bar"
          placeholder="Search">
        </input>
      </div>
      <button 
        onClick={switchTheme} 
        className="toggle-light-mode"
        title={theme === 'light' ? 'switch to dark mode' : 'switch to light mode'}>
          {theme === 'light' ? '☀️' : '🌙'}
      </button>
    </div>
  )
}

export default Search