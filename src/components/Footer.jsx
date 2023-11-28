import { Link } from "react-router-dom";
import played from "@/assets/icons/gamesPlayed.png";
import toPlay from "@/assets/icons/gamesToPlay.png";
import search from "@/assets/icons/search.png";

export default function Footer(props) {
  return (
    <div className="flex justify-between">
      <Link to="/games/toplay">
        <img
          id="gamesToPlay"
          className="w-8 h-8"
          src={toPlay}
          alt="shopping bag with controller icon"
        />
      </Link>
      <Link to="/">
        <img
          id="search"
          className="w-8 h-8 searchIcon"
          src={search}
          alt="magnifying glass search icon"
        />
      </Link>
      <Link to="/games/played">
        <img
          id="gamesPlayed"
          className="w-8 h-8"
          src={played}
          alt="papers with controller icon"
        />
      </Link>
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
