import React, { useEffect, useState } from 'react'
import {db, ref, remove, update, gameStateDB} from '../firebaseConfig'
import UserDataModal from './UserDataModal'

export default function GameCard(props) {
  const [isOnList, setIsOnList] = useState('')
  const [userPlayedGameData, setUserPlayedGameData] = useState({
    monthPlayed: '', yearPlayed: '', comments: '', status: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')

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
  
  function handleSubmit(e, game){
    e.preventDefault()
    setShowModal(false)
    const gameData = {...game, ...userPlayedGameData}
    addGameToList(e, gameData)
  }

  function handleShowModal(){
    setShowModal(prev => !prev)
  }

  function addGameToList(e, game){
    const list = e.target.id
    const updates = {};
    updates[`/users/${props.userUID}/${list}/${game.id}`] = [game];
    update(gameStateDB, updates);
    setShowConfirmationModal(true)
    setConfirmationText('Game added to list')
    setTimeout(() => {
      setShowConfirmationModal(false)
    }, 1500)
  }
  
  function removeFromList(e){
    setShowConfirmationModal(true)
    setConfirmationText('Game removed from list')
    setTimeout(() => {
      setShowConfirmationModal(false)
      const gameID = e.target.id
      const gameRef = ref(db, `gameState/users/${props.userUID}/${isOnList}/${gameID}`)
      remove(gameRef)
    }, 1500)
  }

  let buttonContainerElement = "";

  if (isOnList === "") {
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
          <UserDataModal
            handleShowModal={handleShowModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            userPlayedGameData={userPlayedGameData}
            result={props.result}
          />
        ) : null}
      </div>
    );
  } else if (isOnList === "gamesToPlayList") {
    buttonContainerElement = (
      <div className="endResultContainer">
        <button
          id={props.result.id}
          className="resultButton purple btn"
          onClick={removeFromList}
        >
          Remove
        </button>
        <button
          id="gamesPlayedList"
          className="resultButton orange btn"
          onClick={handleShowModal}
        >
          I played it
        </button>
        {showModal ? (
          <UserDataModal
            handleShowModal={handleShowModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            userPlayedGameData={userPlayedGameData}
            result={props.result}
          />
        ) : null}
      </div>
    );
  } else if (isOnList === "gamesPlayedList") {
    buttonContainerElement = (
      <div className="endResultContainer">
        <button
          id={props.result.id}
          className="resultButton purple btn"
          onClick={removeFromList}
        >
          Remove
        </button>
      </div>
    );
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
      {showConfirmationModal 
        ? 
        <div className="confirmationModalContainer">
          <p>{confirmationText}</p>
        </div>
        : null }

    </div>
  );
}
