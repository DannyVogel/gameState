import gameConsole from "../assets/gameConsole.png";

export default function Loader(props) {
  return (
    <div className={`${props.isUnmounting && ""} loader`}>
      <div className="loader-wrapper">
        <h1 className="headerTitle">
          <span className="gameItalic">game</span>State
        </h1>
        <img
          className="loader-image"
          src={gameConsole}
          alt="gameConsole enlarged image"
          width={150}
        />
        <h2 className="headerTitle">Loading...</h2>
      </div>
    </div>
  );
}
