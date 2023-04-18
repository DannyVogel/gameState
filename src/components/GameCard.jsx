import React, { useEffect, useState } from 'react'
import {db, ref, remove, update, gameStateDB} from '../firebaseConfig'

export default function GameCard(props) {
  const [isOnList, setIsOnList] = useState('')
  const [userPlayedGameData, setUserPlayedGameData] = useState({
    monthPlayed: '', yearPlayed: '', comments: '', status: ''
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
    const {name, value, type, checked} = e.target
    setUserPlayedGameData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
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
  
  function removeFromList(e){
    const gameID = e.target.id
    const gameRef = ref(db, `gameState/users/${props.userUID}/${isOnList}/${gameID}`)
    remove(gameRef)
  }

  let buttonContainerElement = ''
  if(isOnList === ''){
    buttonContainerElement = (
      <div className="endResultContainer">
        <button
          id="gamesToPlayList"
          className="resultButton purple btn"
          onClick={(e) => addGameToList(e, props.result)}
        >
          I want to play it
        </button>
        <button
          id="gamesPlayedList"
          className="resultButton orange btn"
          onClick={handleShowModal}
        >
          I played it
        </button>
        {showModal ? (
          <div className="modalContainer">
            <span className="closeModal" onClick={handleCloseModal}>
              x
            </span>
            <form
              className="modalForm"
              id={"gamesPlayedList"}
              onSubmit={(e) => handleSubmit(e, props.result)}
            >
              <div className="datePlayed">
                <span>Date Played:</span> 
                <input
                  type="number"
                  name="monthPlayed"
                  id="monthPlayed"
                  min={1}
                  max={12}
                  value={userPlayedGameData.monthPlayed}
                  onChange={handleChange}
                  placeholder="MM"
                />-
                <input
                  type="number"
                  name="yearPlayed"
                  id="yearPlayed"
                  min={1900}
                  max={3000}
                  value={userPlayedGameData.yearPlayed}
                  onChange={handleChange}
                  placeholder="YYYY"
                  required
                />
              </div>
              <div className="gameCommentsContainer">
                <label htmlFor="comments">Comments:</label>
                <textarea
                  name="comments"
                  id="comments"
                  rows={2}
                  cols={25}
                  value={userPlayedGameData.comments}
                  onChange={handleChange}
                />
              </div>
              <div className="gameStatusContainer">
                <span>Game status:</span>
                <input type="radio" name="status" id="playing" value="playing" checked={userPlayedGameData.status === 'playing'} onChange={handleChange}/>
                <label htmlFor="playing">Playing</label>
                <input type="radio" name="status" id="beat" value="beat" checked={userPlayedGameData.status === 'beat'} onChange={handleChange}/>
                <label htmlFor="beat">Beat</label>
                <input type="radio" name="status" id="dropped" value="dropped" checked={userPlayedGameData.status === 'dropped'} onChange={handleChange}/>
                <label htmlFor="dropped">Dropped</label>
              </div>
              <button className='addToListBtn btn' type="submit">Save</button>
            </form>
          </div>
        ) : null}
      </div>
    );
  } else if (isOnList === 'gamesToPlayList'){
    buttonContainerElement = 
    <div className="endResultContainer">
    <button
      id={props.result.id}
      className="resultButton purple btn" onClick={removeFromList}
    >
      Remove
    </button>
    <button
          id='gamesPlayedList'
          className="resultButton orange btn" onClick={handleShowModal}
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
          className="resultButton purple btn" onClick={removeFromList}
        >
          Remove
        </button>
      </div>
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
