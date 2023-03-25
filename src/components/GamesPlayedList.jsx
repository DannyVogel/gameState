import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'
import {db, gameStateDB, ref, update, remove, onValue} from '../firebaseConfig'

export default function GamesPlayedList(props) {
  const [savedList, setSavedList] = useState(()=>[])

  useEffect(() => {
    const gameRef = ref(db, `gameState/users/${props.userUID}/gamesPlayedList`)
    onValue(gameRef, (snapshot) => {
      snapshot.exists() ? setSavedList(Object.values(snapshot.val())) : null
      console.log(Object.values(snapshot.val()))
    })
  }, []);
  
  function renderList(list){
    return list.map((game) => {  
            return <GameCard 
                        key={game[0].id} 
                        result={game[0]}
                    />
      })
  }
  
  return (
    <div>
      {renderList(savedList)}
    </div>
  )
}
