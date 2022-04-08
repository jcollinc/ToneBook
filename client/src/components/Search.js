import React from 'react'
import '../styles/Nav.css';

function Search({ modal, setModal }) {
  return (
    <div id="search-div">
      <button 
        id="new-routine"
        title="create new routine"
        onClick={() => setModal(true)}
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