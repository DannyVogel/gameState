import played from "@/assets/icons/gamesPlayed.png";
import toPlay from "@/assets/icons/gamesToPlay.png";

const Default = () => {
  return (
    <div className="welcomeContainer">
      <div className="iconContainer">
        <h1 className="headerTitle">Find Games!</h1>
        <img
          className="w-8 h-8"
          src="./search.png"
          alt="magnifying glass search icon"
        />
      </div>
      <h1 className="headerTitle">Save them to a list!</h1>
      <div className="listsContainer">
        <div className="iconContainer">
          <img
            className="w-8 h-8"
            src={toPlay}
            alt="shopping bag with controller icon"
          />
          <p className="headerTitle">
            Games <span>{<br />}</span> to play
          </p>
        </div>
        <div className="iconContainer">
          <img
            className="w-8 h-8"
            src={played}
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
};

export default Default;
