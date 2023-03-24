import React, {useState, useEffect} from 'react'
import GameSearchResults from './GameSearchResults'

export default function GameSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const apiKey = 'b0bf8fc68ea6427fab93a3535a4be903'
  
  function handleChange(e){
    const {value} = e.target
    setSearchTerm(value)
  }

  function processSearch(e){
    e.preventDefault()
    fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setResults(data.results)
        })
    }

    const searchResultsEl = results.map(result => {
        return <GameSearchResults 
                    key={result.id} 
                    result={result}
                />
    })

  return (
    <div className='gameSearchContainer'>
        <h1>gameSearch</h1>
        <form className='searchForm' onSubmit={processSearch}>
            <input className='searchBar' type="text" id='searchTerm' name='searchTerm' value={searchTerm} onChange={handleChange} placeholder='Find your game' autoComplete='off'/>
            <button className='searchBtn btn' >Search</button>
        </form>
        <div className='resultsContainer'>
            {results.length > 0 ? searchResultsEl : <p>No results</p>}
        </div>
    </div>
  )
}
