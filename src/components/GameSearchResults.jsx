import React from 'react'

export default function GameSearchResults(props) {

    
  return (
    <div key={props.result.id} className='resultContainer'>
        <h3>{props.result.name}</h3>
        <img className='resultImage' src={props.result.background_image} alt={props.result.name}/>
    </div>
  )
}
