import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'
import {db, ref, remove, onValue} from '../firebaseConfig'
import { Triangle } from  'react-loader-spinner'

export default function GamesToPlayList(props) {
  const [loading , setLoading] = useState(true)
  const [savedList, setSavedList] = useState(()=>[])

  useEffect(() => {
    const gameRef = ref(db, `gameState/users/${props.userUID}/gamesToPlayList`)
    onValue(gameRef, (snapshot) => {
      snapshot.exists() ? setSavedList(Object.values(snapshot.val())) : setSavedList([])
    })
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [savedList])
  
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
        renderList(savedList))}
    </div>
  )
}

