import React, {useState} from 'react'
import ProfileModal from './ProfileModal'
import { Zoom } from "react-awesome-reveal";

export default function Header(props) {
  const [profileClicked, setProfileClicked] = useState(false)
  
  function handleProfileClick(){
    setProfileClicked(prev => !prev)
  }
  
  return (
    <div className="headerContainer">
      <Zoom className="headerTitle">
        <h1>
          <span className="gameItalic">game</span>State
        </h1>
      </Zoom>
      {props.loggedIn ? (
        <img
          src="./loggedInUser.png"
          alt="profile icon"
          className="profileIcon"
          onClick={handleProfileClick}
        />
      ) : (
        <img
          src="./loggedOutUser.png"
          alt="profile icon"
          className="profileIcon"
          onClick={handleProfileClick}
        />
      )}
      {profileClicked && (
        <ProfileModal
          handleProfileClick={handleProfileClick}
          loggedIn={props.loggedIn}
          user={props.user}
        />
      )}
    </div>
  );
}
