import { Link } from "react-router-dom";
import played from "@/assets/icons/gamesPlayed.png";
import toPlay from "@/assets/icons/gamesToPlay.png";
import search from "@/assets/icons/search.png";

export default function Footer(props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 px-10 py-5 rounded-t-lg w-full flex justify-between bg-slate-800">
      <div className="w-full flex justify-between max-w-2xl mx-auto px-5">
        <Link to="/toplay">
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
            className="w-14 h-14 searchIcon absolute -top-4 left-0 right-0 bottom-0 mx-auto bg-slate-800 p-2 rounded-full"
            src={search}
            alt="magnifying glass search icon"
          />
        </Link>
        <Link to="/played">
          <img
            id="gamesPlayed"
            className="w-8 h-8"
            src={played}
            alt="papers with controller icon"
          />
        </Link>
      </div>
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
