import React, {useState} from 'react'
import WelcomeSplash from './WelcomeSplash'
import GameCard from './GameCard'
import Result from '../utility/resultsConstructor'
import apiKey from '../utility/apikey'

export default function GameSearch(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [num, setNum] = useState(0)
  
  function handleChange(e){
    const {value} = e.target
    setSearchTerm(value)
  }

  function processSearch(e){
    e.preventDefault()
    setNum(0)
    fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            setResults(data.results.map(result => new Result(result)))
        })
    setSearchTerm('')
    }
  
  function renderFiveResults(results){
    return results.map((result, index) => {  
      if(index >= (num + 0) && index < (num + 3)){
            return <GameCard 
                        key={result.id} 
                        result={result}
                        userUID={props.userUID}
                    />
      }})
  }

  return (
    <div className='gameSearchContainer'>
      <div className='resultsContainer'>
          {results.length > 0 ? renderFiveResults(results) : <WelcomeSplash />}
      {results.length > 0 
      ? <div className="pageSelectContainer">
            {num > 0 ? <p className='pageSelectText' onClick={()=>setNum(prevNum => prevNum -= 3)}>Previous Page</p> : null}
            {(num > 0 && num < results.length - 3) && <p className='pageSelectText'>-</p>}
            {num < results.length - 3 && <p className='pageSelectText' onClick={()=>setNum(prevNum => prevNum += 3)}>Next Page</p>}
        </div>
      : null
      }
      </div>
      <form className='searchFormContainer' onSubmit={processSearch}>
                <input className='searchBar' type="text" id='searchTerm' name='searchTerm' value={searchTerm} onChange={handleChange} placeholder='Find your game' autoComplete='off'/>
                <button type='submit' className='searchBtn btn'>Search</button>
      </form>
    </div>
  )
}
