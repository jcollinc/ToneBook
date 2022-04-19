import React, { useEffect, useState } from 'react'
import '../styles/Routines.css';
import RoutineCard from './RoutineCard'
import FormNew from './FormNew'
import FormEdit from './FormEdit';

function Routines({ currentUser, setSearch, search, modal, setModal, edit, setEdit, routineId, setRoutineId, routines, setRoutines, setExercises}) {

  const [editedRoutine, setEditedRoutine] = useState(null)

  useEffect (() => {
    fetch("/routines")
    .then(r => r.json())
    .then(allRo => {
      setRoutines(allRo)
    })
  }, [])

  let filteredRoutines 
  let filteredDisplay
  
  if (routines) filteredRoutines = routines.filter((routine) => {
    return (
        routine.name.toUpperCase().includes(search.toUpperCase()) || 
        routine.description.toUpperCase().includes(search.toUpperCase())
    )
  })
  
  if (filteredRoutines) {
    filteredDisplay = filteredRoutines.map(routine => {
      return <RoutineCard 
          key={routine.id} 
          routine={routine} 
          setModal={setModal}
          handleDelete={handleDelete} 
          setEdit={setEdit}
          setRoutineId={setRoutineId}
          setEditedRoutine={setEditedRoutine}
          currentUser={currentUser}
          setSearch={setSearch}
        />
    })
  } 

  function handleDelete (e) {
    fetch(`/routines/${e.target.name}`, {
        method: "DELETE"
    }) 
    setRoutines(routines => routines.filter(routine => routine.id != e.target.name))
    setExercises(exercises => exercises.filter(exercise => exercise.routine_id != e.target.name))
  }

  return (
    <div className="routine-page-holder">
      <div className="routine-cards-holder">
        {filteredDisplay}
      </div>
      {/* MODAL */}
      <div className={modal ? 'modal-active' : 'modal'} id='modal'>
        <div className='modal-header'>
          <div className='title'>{edit ? `Edit Routine` : `Create New Routine`}</div>
          <button onClick={() => {
            setModal(false)
            setEdit(false)
            setEditedRoutine(null)
          }}className='close-button'>x</button>
        </div>
        <div className='modal-body'>
          { !edit ? 
          <FormNew 
            setEdit={setEdit}
            edit={edit}
            setRoutines={setRoutines}
            currentUser={currentUser}
            setModal={setModal}
          /> :
          <FormEdit 
            setModal={setModal}
            setRoutines={setRoutines}
            setEdit={setEdit}
            routines={routines}
            routineId={routineId}
            editedRoutine={editedRoutine}
          />
          }
        </div>
      </div>
      <div 
        id={modal ? 'overlay-active' : 'overlay'}
        onClick={() => {
          modal ? setModal(false) : setModal(false)
          edit ? setEdit(false) : setEdit(false)
        }}
      >   
      </div>
    </div>
  )
}

export default Routines