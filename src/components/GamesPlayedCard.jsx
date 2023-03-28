import React, { useState } from 'react'

export default function GamesPlayedCard(props) {
  const [showCardModal, setShowCardModal] = useState(false)
  
  const {name, monthPlayed, yearPlayed, comments, status, image, released, stores, slug} = props.result

  function handleShowCardModal(){
    setShowCardModal(prev => !prev)
  }

  return (
    <div className='cardsContainer'>
      <div className='gamesPlayedCardContainer'>
          <div className="gamesPlayedDetails">
            <h4 className='gamesPlayedCardTitle'>{name}</h4>
            <div className='gamesPlayedCardDetailsContainer'>
                <p>Played: {monthPlayed}-{yearPlayed}</p>
                <p>Status: {status}</p>
            </div>
          </div>
          <div className="btnContainer">
            <button className='gamesPlayedCardBtn btn' onClick={handleShowCardModal}>View card</button>
          </div>
      </div>

      {showCardModal 
        ? 
          <div className='fullGameCardContainer'>
            <span className="closeModal" onClick={handleShowCardModal}>x</span>
            <h3>{name}</h3>
            <div className="imageContainer">
              {image && (
                <img
                  className="image"
                  src={image}
                  alt={name}
                />
              )}
            </div>
            <div className="details">
              <p>Released: {released}</p>
              <p>Played: {monthPlayed}-{yearPlayed}</p>
              <p>Status: {status}</p>
              <p>Comments: {comments}</p>
            </div>
            <a
            href={`https://www.rawg.io/games/${props.result.slug}`}
            target="_blank"
            rel="noreferrer"
            >
            More Info
            </a>
          </div>
        : null}


    {/* </div>
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

      {/* {buttonContainerElement} */}

    </div>
  )
}
