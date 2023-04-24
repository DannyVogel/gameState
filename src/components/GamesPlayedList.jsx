import React, { useState, useEffect } from 'react'
import GamesPlayedCard from './GamesPlayedCard'
import {db, ref, onValue} from '../firebaseConfig'
import { Triangle } from  'react-loader-spinner'

export default function GamesPlayedList(props) {
  const [loading , setLoading] = useState(true)
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
      const data =  snapshot.exists() ? Object.values(snapshot.val()) : []
      setSavedList(data)
    })
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [savedList])

  function renderList(list, filters){
    if(filters.yearPlayed !== ''){
      list = list.filter((game) => game[0].yearPlayed === filters.yearPlayed)
    }
    if(filters.status !== ''){
      list = list.filter((game) => game[0].status === filters.status)
    }
    if(list.length < 1){
      if(!props.userUID){
        return <p>Please sign up or sign in to see list</p>
      }
      return <p>No games found</p>
    }
    const sortedDataByMonth = list?.sort((a, b) => b[0].monthPlayed - a[0].monthPlayed)
    const sortedDataByYear = sortedDataByMonth.sort((a, b) => b[0].yearPlayed - a[0].yearPlayed)
    const years = [...new Set(sortedDataByYear.map(item => item[0].yearPlayed))];
    return years.map(year => (
      <div className='gameCardContainer' key={year}>
        <h2>{year}</h2>
        {sortedDataByYear.filter(item => item[0].yearPlayed === year).map(item => (
            <GamesPlayedCard
              key={item[0].id}
              result={item[0]}
              userUID={props.userUID}
            />
        ))}
      </div>
    ))
  }
 

  return (
    <div className="gameListContainer">
      <h1>Games Played</h1>
      <form className="filterContainer">
        <div className="filterIconContainer">
          <i
            className="fa-solid fa-filter left"
            onClick={handleShowFilters}
          ></i>
        </div>
        {showFilters ? (
          <>
            <p>Filter by:</p>
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
            <select
              name="status"
              id="status"
              value={filterInput.status}
              onChange={handleChange}
            >
              <option value="">
                Status
              </option>
              <option value="playing">Playing</option>
              <option value="beat">Beat</option>
              <option value="dropped">Dropped</option>
            </select>
            <button className="blue" onClick={applyFilters}>
              Set
            </button>
            <button className="blue" onClick={clearFilters}>
              Clear
            </button>
          </>
        ) : null}
      </form>
      {loading ? (
        <Triangle
          height="80"
          width="80"
          color="#293264"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        renderList(savedList, filter)
      )}
    </div>
  );
}
