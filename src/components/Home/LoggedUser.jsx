import useUserStore from "@/stores/userStore";
import played from "@/assets/icons/gamesPlayed.png";
import toPlay from "@/assets/icons/gamesToPlay.png";
import { Link } from "react-router-dom";

const LoggedUser = () => {
  const user = useUserStore((state) => state.user);
  const UID = useUserStore((state) => state.UID);
  const gameList = useUserStore((state) => state.gameList);
  let userName = user.charAt(0).toUpperCase() + user.slice(1);
  if (userName == "Kelevrav") {
    userName = userName.slice(0, -1);
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-14 flex-grow">
        <h1 className="font-bold text-center text-4xl text-white py-2">
          Welcome back
        </h1>
        <h1 className="font-bold text-center text-6xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent py-2">
          {userName}
        </h1>
      </div>
      <div className="mt-20 px-14 max-w-md w-full flex justify-between">
        <Link
          to="/toPlay"
          className="flex flex-col items-center gap-2 text-white font-bold"
        >
          <img
            className="w-8 h-8"
            src={toPlay}
            alt="shopping bag with controller icon"
          />
          <div className="flex flex-col items-center">
            <p>{gameList.filter((game) => game.status === "toPlay").length}</p>
            <p>
              Games <span>{<br />}</span> to play
            </p>
          </div>
        </Link>
        <Link
          to="/played"
          className="flex flex-col items-center gap-2 text-white font-bold"
        >
          <img
            className="w-8 h-8"
            src={played}
            alt="papers with controller icon"
          />
          <div className="flex flex-col items-center">
            <p>{gameList.filter((game) => game.status !== "toPlay").length}</p>
            <p className="">
              Games <span>{<br />}</span> played
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoggedUser;
