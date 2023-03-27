import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'
import {db, ref, remove, onValue} from '../firebaseConfig'

export default function GamesToPlayList(props) {
  const [savedList, setSavedList] = useState(()=>[])

  useEffect(() => {
    const gameRef = ref(db, `gameState/users/${props.userUID}/gamesToPlayList`)
    onValue(gameRef, (snapshot) => {
      snapshot.exists() ? setSavedList(Object.values(snapshot.val())) : setSavedList([])
    })
  }, []);
  
  function renderList(list){
    return list.map((game) => {  
            return <GameCard 
                        key={game[0].id} 
                        result={game[0]}
                        onList={'gamesToPlayList'}
                        userUID={props.userUID}                        
                    />
      })
  }
  
  return (
    <div className='gameListContainer'>
      <h1>Games To Play</h1>
      {renderList(savedList)}
    </div>
  )
}

