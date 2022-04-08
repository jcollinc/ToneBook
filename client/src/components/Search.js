import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Nav.css';

function Search({ modal, setModal, userId }) {

  let history = useHistory()

  return (
    <div id="search-div">
      <button 
        id="new-routine"
        title="create new routine"
        onClick={() => {
          setModal(true)
          history.push(`/${userId}/routines`)
        }}
        className="button">
          +
      </button>
      <input 
        id="search-bar"
        placeholder="Search">
      </input>
    </div>
  )
}

export default Search