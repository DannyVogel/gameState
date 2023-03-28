import React, { useState, useEffect } from 'react'
import GamesPlayedCard from './GamesPlayedCard'
import GameCard from './GameCard'
import {db, ref, onValue} from '../firebaseConfig'

export default function GamesPlayedList(props) {
  const [savedList, setSavedList] = useState(()=>[])

  useEffect(() => {
    const gameRef = ref(db, `gameState/users/${props.userUID}/gamesPlayedList`)
    onValue(gameRef, (snapshot) => {
      const data = Object.values(snapshot.val())
      snapshot.exists() ? setSavedList(data) : setSavedList([])
    })
  }, []);

  function renderList(list){
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
    <div className='gameListContainer'>
      <h1>Games Played</h1>
      {renderList(savedList)}
    </div>
  )
}
