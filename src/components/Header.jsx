import React, { useState } from "react";
import ProfileModal from "./ProfileModal";

export default function Header(props) {
  const [profileClicked, setProfileClicked] = useState(false);

  function handleProfileClick() {
    setProfileClicked((prev) => !prev);
  }

  return (
    <div className="headerContainer">
      <h1 className="headerTitle">
        <span className="gameItalic">game</span>State
      </h1>
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
