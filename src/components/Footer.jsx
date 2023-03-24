import React from 'react'

export default function Footer(props) {
  return (
    <div className='footerContainer'>
        <img id='gamesToPlay' className='footerIcon' src="./gamesToPlay1.png" alt="shopping bag with controller icon" onClick={props.handlePageChange}/>
        <img id='search' className='footerIcon searchIcon' src="./search.png" alt="magnifying glass search icon" onClick={props.handlePageChange}/>
        <img id='gamesPlayed' className='footerIcon' src="./gamesPlayed1.png" alt="papers with controller icon" onClick={props.handlePageChange}/>
    </div>
  )
}

{/* <a href="https://www.flaticon.com/free-icons/want" title="want icons">Want icons created by redempticon - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/gamification" title="gamification icons">Gamification icons created by redempticon - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/gamepad" title="gamepad icons">Gamepad icons created by Freepik - Flaticon</a> */}