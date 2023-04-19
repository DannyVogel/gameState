import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'
import {db, ref, remove, onValue} from '../firebaseConfig'
import { Triangle } from  'react-loader-spinner'

export default function GamesToPlayList(props) {
  const [loading , setLoading] = useState(true)
  const [savedList, setSavedList] = useState(()=>[])

 useEffect(() => {
    if(props.userUID === ''){
      const list = localStorage.getItem('gamesToPlayList') ? JSON.parse(localStorage.getItem('gamesToPlayList')) : []
      setSavedList(list)
    } else {
      const gameRef = ref(db, `gameState/users/${props.userUID}/gamesToPlayList`)
      onValue(gameRef, (snapshot) => {
        const data = Object.values(snapshot.val())
        console.log(data)
        snapshot.exists() ? setSavedList(data) : setSavedList([])
      })
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [savedList])
  
  function renderList(list) {
    if (list.length === 0) return <p>No games found</p>;
    if (props.userUID === "") {
      return list.map((game) => {
        return (
          <GameCard
            key={game.id}
            result={game}
            onList={"gamesToPlayList"}
            userUID={props.userUID}
          />
        );
      });
    } else {
      return list.map((game) => {
        return (
          <GameCard
            key={game[0].id}
            result={game[0]}
            onList={"gamesToPlayList"}
            userUID={props.userUID}
          />
        );
      });
    }
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

