import React from "react";

export default function WelcomeSplash(props) {
  return (
    <div className="welcomeContainer">
      <div className="iconContainer">
        <h1 className="headerTitle">Find Games!</h1>
        <img
          className="welcomeIcon"
          src="./search.png"
          alt="magnifying glass search icon"
        />
      </div>
      <h1 className="headerTitle">Save them to a list!</h1>
      <div className="listsContainer">
        <div className="iconContainer">
          <img
            className="welcomeIcon"
            src="./gamesToPlay1.png"
            alt="shopping bag with controller icon"
          />
          <p className="headerTitle">
            Games <span>{<br />}</span> to play
          </p>
        </div>
        <div className="iconContainer">
          <img
            className="welcomeIcon"
            src="./gamesPlayed1.png"
            alt="papers with controller icon"
          />
          <p className="headerTitle">
            Games <span>{<br />}</span> played
          </p>
        </div>
      </div>
      <h1 className="headerTitle">
        Sign up to see your <span>{<br />}</span> lists across devices!
      </h1>
    </div>
  );
}
