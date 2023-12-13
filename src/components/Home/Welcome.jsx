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
    <div className="flex-grow flex flex-col gap-20">
      <div className="h-[132px] mt-14">
        <h1
          className={`font-bold text-center ${
            UID ? "text-4xl" : "text-3xl"
          } text-primary py-2`}
        >
          {UID ? "Welcome back" : "Find Games!"}
        </h1>
        <h1
          className={`font-bold text-center ${
            UID
              ? "text-6xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
              : "text-3xl text-primary"
          }  py-2`}
        >
          {UID ? userName : "Save them to a list!"}
        </h1>
      </div>
      <div className="h-28 px-14 max-w-md w-full flex justify-between">
        <Link
          to={UID ? "/toPlay" : ""}
          className="flex flex-col items-center gap-2 text-primary font-bold"
        >
          <img
            className="w-8 h-8"
            src={toPlay}
            alt="shopping bag with controller icon"
          />
          <div className="flex flex-col items-center">
            <p>
              {UID &&
                gameList.filter((game) => game.status === "toPlay").length}
            </p>
            <p>
              Games <span>{<br />}</span> to play
            </p>
          </div>
        </Link>
        <Link
          to={UID ? "/played" : ""}
          className="flex flex-col items-center gap-2 text-primary font-bold"
        >
          <img
            className="w-8 h-8"
            src={played}
            alt="papers with controller icon"
          />
          <div className="flex flex-col items-center">
            <p>
              {UID &&
                gameList.filter((game) => game.status !== "toPlay").length}
            </p>
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
