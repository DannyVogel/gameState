import played from "@/assets/icons/gamesPlayed.png";
import toPlay from "@/assets/icons/gamesToPlay.png";
import search from "@/assets/icons/search.png";

const Default = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <div className="font-bold flex-grow flex flex-col items-center gap-10 text-xl ">
        <h1 className="headerTitle">Find Games!</h1>
        <img
          className="w-8 h-8"
          src={search}
          alt="magnifying glass search icon"
        />
        <h1 className="headerTitle">Save them to a list!</h1>
        <div className=" max-w-md w-full flex justify-around">
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-8 h-8"
              src={toPlay}
              alt="shopping bag with controller icon"
            />
            <p className="">
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
            <p className="">
              Games <span>{<br />}</span> played
            </p>
            {/* <p>{props.gamesPlayedList.length} games listed</p> */}
          </div>
        </div>
        <h1 className="headerTitle">
          Sign up to see your <span>{<br />}</span> lists across devices!
        </h1>
      </div>
    </div>
  );
};

export default Default;
