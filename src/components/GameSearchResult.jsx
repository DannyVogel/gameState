import React from 'react'

export default function GameSearchResult(props) {
  
  console.log(props.result)
    
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
        {props.result.image && (
          <img
            className="resultImage"
            src={props.result.image}
            alt={props.result.name}
          />
        )}
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

      <div className="endResultContainer">
        <button
          className="resultButton red btn" /*onClick={() => props.handleAddGame(props.result)}*/
        >
          I want to play it
        </button>
        <button
          className="resultButton green btn" /*onClick={() => props.handleAddGame(props.result)}*/
        >
          I played it
        </button>
      </div>

    </div>
  );
}
