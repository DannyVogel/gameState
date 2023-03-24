import React from 'react'
import { Fade } from "react-awesome-reveal";

export default function WelcomeSplash() {
  return (
    <div className='welcomeContainer'>
        <Fade cascade={true} duration={1500} delay={500} style={{width: '420px', height: '625px'}}>
            <div className="iconContainer">
                <h1 className='headerTitle'>Find Games!</h1>
                <img className='footerIcon' src="./search.png" alt="magnifying glass search icon" />
            </div>
            <h1 className='headerTitle'>Save them to a list!</h1>
            <div className='listsContainer'>
                <div className="iconContainer">
                    <img className='footerIcon' src="./gamesToPlay1.png" alt="shopping bag with controller icon" />
                    <p className='headerTitle'>Games <span>{<br/>}</span> to play</p>
                </div>
                <div className="iconContainer">
                    <img className='footerIcon' src="./gamesPlayed1.png" alt="papers with controller icon" />
                    <p className='headerTitle'>Games <span>{<br/>}</span> played</p>
                </div>
            </div>
            <h1 className='headerTitle'>Sign up to see your <span>{<br/>}</span> lists across devices!</h1>
        </Fade>
    </div>
  )
}
