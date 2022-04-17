import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Nav.css';

function Search({ modal, setModal, userId, setEdit }) {

  let history = useHistory()

  return (
    <div id="search-div">
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
  )
}

export default Search