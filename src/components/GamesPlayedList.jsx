import React from 'react'
import GameSearchResult from './GameSearchResult'

export default function GamesPlayedList() {
  
  
  function renderFiveResults(results){
    return results.map((result, index) => {  
      if(index >= (num + 0) && index < (num + 3)){
            return <GameSearchResult 
                        key={result.id} 
                        result={result}
                        handleAddGameToList={addGameToList}
                    />
      }})
  }
  
  return (
    <div>
      <GameSearchResult />
    </div>
  )
}
