import React, { useState } from 'react'
import {db, remove, update, gameStateDB} from '../firebaseConfig'
import ImageGallery from './ImageGallery'
import { useClickOutside } from '@mantine/hooks';

export default function GamesPlayedCard(props) {
  const {id, name, monthPlayed, yearPlayed, comments, status, image, released, slug, platforms, screenshots} = props.result
  
  const [showCardModal, setShowCardModal] = useState(false)
  const [editItem, setEditItem] = useState(false)
  const [editItemData, setEditItemData] = useState({
    monthPlayed: monthPlayed, yearPlayed: yearPlayed, status: status, comments: comments})

    const ref = useClickOutside(() => {
      setTimeout(() => {
        setShowCardModal(false)
      }, 50) 
    })

  function handleShowCardModal(){
    setShowCardModal(prev => !prev)
  }

  function removeFromList(e){
    setShowCardModal(prev => !prev)
    const gameID = e.target.id
    const gameRef = ref(db, `gameState/users/${props.userUID}/gamesPlayedList/${gameID}`)
    remove(gameRef)
  }

  function handleEdit(){
    setEditItem(true)
  }

  function handleChange(e){
    const {name, value} = e.target
    setEditItemData(prev => ({...prev, [name]: value}))
  }


  function updateItem(e){
    e.preventDefault()
    setEditItem(false)
    const gameData = {...props.result, ...editItemData}
    const updates = {};
    updates[`/users/${props.userUID}/gamesPlayedList/${id}`] = [gameData];
    update(gameStateDB, updates);
  }

  return (
    <div className='cardsContainer'>
      <div className='gamesPlayedCardContainer'>
            <h4 className='gamesPlayedCardTitle'>{name}</h4>
          <div className="gamesPlayedDetails">
            <div className='gamesPlayedCardDetailsContainer'>
                <p>Played: {monthPlayed}{monthPlayed && yearPlayed ? '-' : null}{yearPlayed}</p>
                <p>{status ? `Status: ${status}` : null}</p>
            <div className="btnContainer">
              <button className='gamesPlayedCardBtn btn' onClick={handleShowCardModal}>View card</button>
            </div>
            </div>
          </div>
      </div>

      {showCardModal 
        ? 
          <div ref={ref} className='fullGameCardContainer'>
            <span className="closeModal" onClick={handleShowCardModal}>x</span>
            <h3>{name}</h3>
            <ImageGallery screenshots={screenshots}/>
            <div className="details">
              <p>Released: {released}</p>
              <p>Platforms: {platforms && platforms.join(', ')}</p>
              {editItem 
                ? 
                  <form className="editGameForm">
                    <div className="datePlayed">
                      <span>Date Played:</span> 
                      <input
                        type="number"
                        name="monthPlayed"
                        id="monthPlayed"
                        min={1}
                        max={12}
                        value={editItemData.monthPlayed}
                        onChange={handleChange}
                        placeholder="MM"
                      />-
                      <input
                        type="number"
                        name="yearPlayed"
                        id="yearPlayed"
                        min={1900}
                        max={3000}
                        value={editItemData.yearPlayed}
                        onChange={handleChange}
                        placeholder="YYYY"
                        required
                      />
                    </div>
                    <div className="gameStatusContainer">
                      <span>Game status:</span>
                      <input type="radio" name="status" id="playing" value="playing" checked={editItemData.status === 'playing'} onChange={handleChange}/>
                      <label htmlFor="playing">Playing</label>
                      <input type="radio" name="status" id="beat" value="beat" checked={editItemData.status === 'beat'} onChange={handleChange}/>
                      <label htmlFor="beat">Beat</label>
                      <input type="radio" name="status" id="dropped" value="dropped" checked={editItemData.status === 'dropped'} onChange={handleChange}/>
                      <label htmlFor="dropped">Dropped</label>
                    </div>
                    <div className="gameCommentsContainer">
                      <label htmlFor="comments">Comments:</label>
                      <textarea
                        name="comments"
                        id="comments"
                        rows={2}
                        cols={25}
                        value={editItemData.comments}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                : <>
                    <p>Played: {monthPlayed} - {yearPlayed}</p>
                    <p>Status: {status}</p>
                    <p>Comments: {comments}</p>
                  </>
                }
            </div>
            <a
            href={`https://www.rawg.io/games/${slug}`}
            target="_blank"
            rel="noreferrer"
            >
            More Info
            </a>
            <br />
            <div className="buttonContainer">
              <button
                id={id}
                className={`resultButton ${editItem ? '' : 'orange'} btn`} onClick={editItem ? updateItem : handleEdit}
              >
                {editItem ? "Save" : "Edit"}
              </button>
              <button
                id={id}
                className="resultButton purple btn" onClick={removeFromList}
              >
                Remove
              </button>
            </div>
          </div>
        : null}
    </div>
  )
}
