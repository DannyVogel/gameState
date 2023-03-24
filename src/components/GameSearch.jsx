import React, {useState, useEffect} from 'react'
import GameSearchResult from './GameSearchResult'
import Result from '../utility/resultsConstructor'

export default function GameSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [num, setNum] = useState(0)
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
            setResults(data.results.map(result => new Result(result)))
            console.log(data.results)
        })
    }

    function renderFiveResults(results){
      return results.map((result, index) => {  
        console.log(index, num, (num + 3))  
        if(index >= (num + 0) && index < (num + 3)){
              return <GameSearchResult 
                          key={result.id} 
                          result={result}
                      />
        }})
    }

  return (
    <div className='gameSearchContainer'>
      <h1 className='headerTitle'><span className="gameItalic">game</span>Search</h1>
      <form className='searchForm' onSubmit={processSearch}>
          <input className='searchBar' type="text" id='searchTerm' name='searchTerm' value={searchTerm} onChange={handleChange} placeholder='Find your game' autoComplete='off'/>
          <button className='searchBtn btn'>Search</button>
      </form>
      <div className='resultsContainer'>
          {results.length > 0 ? renderFiveResults(results) : null}
      </div>
      {results.length > 0 
      ? <div className="pageSelectContainer">
            {num > 0 ? <p className='pageSelectText' onClick={()=>setNum(prevNum => prevNum -= 3)}>Previous Page</p> : null}
            {(num > 0 && num < results.length - 3) && <p className='pageSelectText'>-</p>}
            {num < results.length - 3 && <p className='pageSelectText' onClick={()=>setNum(prevNum => prevNum += 3)}>Next Page</p>}
        </div>
      : null
      }
    </div>
  )
}
