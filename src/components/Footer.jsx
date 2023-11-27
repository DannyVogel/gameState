import React from "react";

export default function Footer(props) {
  return (
    <div className="flex justify-between">
      <img
        id="gamesToPlay"
        className="w-8 h-8"
        src="./gamesToPlay1.png"
        alt="shopping bag with controller icon"
        onClick={props.handlePageChange}
      />
      <img
        id="search"
        className="w-8 h-8 searchIcon"
        src="./search.png"
        alt="magnifying glass search icon"
        onClick={props.handlePageChange}
      />
      <img
        id="gamesPlayed"
        className="w-8 h-8"
        src="./gamesPlayed1.png"
        alt="papers with controller icon"
        onClick={props.handlePageChange}
      />
    </div>
  );
}

{
  /* <a href="https://www.flaticon.com/free-icons/want" title="want icons">Want icons created by redempticon - Flaticon</a> */
}
{
  /* <a href="https://www.flaticon.com/free-icons/gamification" title="gamification icons">Gamification icons created by redempticon - Flaticon</a> */
}
{
  /* <a href="https://www.flaticon.com/free-icons/gamepad" title="gamepad icons">Gamepad icons created by Freepik - Flaticon</a> */
}
