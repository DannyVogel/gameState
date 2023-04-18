import React, { useState, useEffect } from 'react'
import GamesPlayedCard from './GamesPlayedCard'
import {db, ref, onValue} from '../firebaseConfig'

export default function GamesPlayedList(props) {
  const [showFilters, setShowFilters] = useState(false)
  const [savedList, setSavedList] = useState(()=>[])
  const [filter, setFilter] = useState({
    yearPlayed: '', status: ''})
  const [filterInput, setFilterInput] = useState({
    yearPlayed: '', status: ''})
  

  function handleShowFilters(e){
    e.preventDefault()
    setShowFilters(prev => !prev)
  }
  
  function handleChange(e){
    const {name, value} = e.target
    setFilterInput(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  function applyFilters(e){
    e.preventDefault()
    setFilter(filterInput)
  }

  function clearFilters(e){
    e.preventDefault()
    setFilterInput({yearPlayed: '', status: ''})
    setFilter({yearPlayed: '', status: ''})
  }

  useEffect(() => {
    const gameRef = ref(db, `gameState/users/${props.userUID}/gamesPlayedList`)
    onValue(gameRef, (snapshot) => {
      const data = Object.values(snapshot.val())
      snapshot.exists() ? setSavedList(data) : setSavedList([])
    })
  }, []);

  function renderList(list, filters){
    if(filters.yearPlayed !== ''){
      list = list.filter((game) => game[0].yearPlayed === filters.yearPlayed)
    }
    if(filters.status !== ''){
      list = list.filter((game) => game[0].status === filters.status)
    }
    if(list){
      return <p>No games found</p>
    }
    const sortedDataByMonth = list.sort((a, b) => b[0].monthPlayed - a[0].monthPlayed)
    const sortedDataByYear = sortedDataByMonth.sort((a, b) => b[0].yearPlayed - a[0].yearPlayed)
    return sortedDataByYear.map((game) => {  
            return <GamesPlayedCard 
                        key={game[0].id} 
                        result={game[0]}
                        userUID={props.userUID}
                    />
      })
  }
  
  return (
    <div className="gameListContainer">
      <h1>Games Played</h1>
        <form className="filterContainer">
          <div className="filterIconContainer">
            <i className="fa-solid fa-filter left" onClick={handleShowFilters}></i>
          </div>
          {showFilters
            ?
            <><p>Filter by:</p>
            <input
              type="number"
              name="yearPlayed"
              id="yearPlayed"
              min={1900}
              max={3000}
              value={filterInput.yearPlayed}
              onChange={handleChange}
              placeholder="YYYY"
            />
            <select name="status" id="status" value={filterInput.status} onChange={handleChange}>
              <option selected value=''>Status</option>
              <option value="playing">Playing</option>
              <option value="beat">Beat</option>
              <option value="dropped">Dropped</option>
            </select>
            <button className='blue' onClick={applyFilters}>Set</button>
            <button className='blue' onClick={clearFilters}>Clear</button></>
          : null
          }
        </form>
      {renderList(savedList, filter)}
    </div>
  );
}
