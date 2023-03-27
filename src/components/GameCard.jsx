import React, { useEffect, useState } from 'react'
import {db, ref, remove, update, gameStateDB} from '../firebaseConfig'

export default function GameCard(props) {
  const [isOnList, setIsOnList] = useState('')
  const [userPlayedGameData, setUserPlayedGameData] = useState({
    yearPlayed: '', comments: ''
  })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if(props.onList === 'gamesToPlayList'){
      setIsOnList('gamesToPlayList')
    } else if(props.onList === 'gamesPlayedList'){
      setIsOnList('gamesPlayedList')
    }
  }, [])

  function handleChange(e){
    const {name, value} = e.target
    setUserPlayedGameData(prevState => ({
      ...prevState,
      [name]: value
    }))

  }

  function handleShowModal(){
    setShowModal(true)
  }

  function handleCloseModal(){
    setShowModal(false)
  }
  
  function handleSubmit(e, game){
    e.preventDefault()
    setShowModal(false)
    const gameData = {...game, ...userPlayedGameData}
    addGameToList(e, gameData)
  }

  function addGameToList(e, game){
    const list = e.target.id
    const updates = {};
    updates[`/users/${props.userUID}/${list}/${game.id}`] = [game];
    update(gameStateDB, updates);
}


  let buttonContainerElement = ''
  if(isOnList === ''){
    buttonContainerElement =       
      <div className="endResultContainer">
        <button
          id='gamesToPlayList' 
          className="resultButton red btn" onClick={(e) => addGameToList(e, props.result)}
        >
          I want to play it
        </button>
        <button
          id='gamesPlayedList'
          className="resultButton green btn" onClick={handleShowModal}
        >
          I played it
        </button>
        {showModal 
          ? <div className="modalContainer">
              <span className="closeModal" onClick={handleCloseModal}>&times;</span>
              <form className='modalForm' id={'gamesPlayedList'} onSubmit={(e) => handleSubmit(e, props.result)}>
                <input type="number" name="yearPlayed" id="yearPlayed" min={1900} max={3000} value={userPlayedGameData.yearPlayed} onChange={handleChange}/>
                <input type="text" name="comments" id="comments" value={userPlayedGameData.comments} onChange={handleChange}/>
                <button type="submit">Save</button>
              </form>
            </div>
          : null  
        }
            
      </div>
  } else if (isOnList === 'gamesToPlayList'){
    buttonContainerElement = 
    <div className="endResultContainer">
    <button
      id={props.result.id}
      className="resultButton red btn" onClick={removeFromList}
    >
      Remove
    </button>
    <button
          id='gamesPlayedList'
          className="resultButton green btn" onClick={handleShowModal}
        >
          I played it
        </button>
        {showModal 
          ? <div className="modalContainer">
              <span className="closeModal" onClick={handleCloseModal}>&times;</span>
              <form className='modalForm' id={'gamesPlayedList'} onSubmit={(e) => handleSubmit(e, props.result)}>
                <input type="number" name="yearPlayed" id="yearPlayed" min={1900} max={3000} value={userPlayedGameData.yearPlayed} onChange={handleChange}/>
                <input type="text" name="comments" id="comments" value={userPlayedGameData.comments} onChange={handleChange}/>
                <button type="submit">Save</button>
              </form>
            </div>
          : null  
        }
  </div>
  } else if (isOnList === 'gamesPlayedList'){
    buttonContainerElement = 
      <div className="endResultContainer">
        <button
          id={props.result.id}
          className="resultButton red btn" onClick={removeFromList}
        >
          Remove
        </button>
      </div>
  }

  function removeFromList(e){
    const gameID = e.target.id
    const gameRef = ref(db, `gameState/users/${props.userUID}/${isOnList}/${gameID}`)
    remove(gameRef)
  }
    
  return (
    <div key={props.result.id} className="resultContainer">
      <h3 className='resultHeader'>
        <a
          className="resultLink"
          href={`https://www.rawg.io/games/${props.result.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          {props.result.name}{" "}
        </a>
      </h3>

      <div className="midResultContainer">
        <div className="resultImageContainer">
          {props.result.image && (
            <img
              className="resultImage"
              src={props.result.image}
              alt={props.result.name}
            />
          )}
        </div>
        <div className="resultInfoContainer">
          <p className="resultText">Released: {props.result.released}</p>
          <p className="resultText">
            Genres: {props.result.genres.map((genre) => genre.name).join(", ")}
          </p>
          <a
            className="resultText"
            href={`https://www.rawg.io/games/${props.result.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            More Info
          </a>
        </div>
      </div>

      {buttonContainerElement}

    </div>
  );
}
