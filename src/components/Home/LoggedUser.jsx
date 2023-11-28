import useUserStore from "@/stores/userStore";
import played from "@/assets/icons/gamesPlayed.png";
import toPlay from "@/assets/icons/gamesToPlay.png";

const LoggedUser = () => {
  const user = useUserStore((state) => state.user);
  const UID = useUserStore((state) => state.UID);
  let userName = user.charAt(0).toUpperCase() + user.slice(1);
  if (userName == "Kelevrav") {
    userName = userName.slice(0, -1);
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-20 flex-grow">
        <h1 className="font-bold text-center text-4xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent py-2">
          Welcome back
        </h1>
        <h1 className="font-bold text-center text-4xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent py-2">
          {userName}
        </h1>
      </div>
      <div className="mt-20 px-14 max-w-md w-full flex justify-between">
        <div className="flex flex-col items-center gap-2">
          <img
            className="w-8 h-8"
            src={toPlay}
            alt="shopping bag with controller icon"
          />
          <p className="bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
            Games <span>{<br />}</span> to play
          </p>
          {/* <p>{props.gamesToPlayList.length} games listed</p> */}
        </div>
        <div className="flex flex-col items-center gap-2">
          <img
            className="w-8 h-8"
            src={played}
            alt="papers with controller icon"
          />
          <p className="bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
            Games <span>{<br />}</span> played
          </p>
          {/* <p>{props.gamesPlayedList.length} games listed</p> */}
        </div>
      </div>
    </div>
  );
};

export default LoggedUser;
