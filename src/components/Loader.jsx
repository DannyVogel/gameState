import gameConsole from "@/assets/gameConsole.png";

export default function Loader(props) {
  return (
    <div
      className={`${
        props.isUnmounting && ""
      } mt-40 flex justify-center items-center`}
    >
      <div className="flex flex-col items-center gap-5">
        <h1 className="animate-pulse py-1 font-bold text-4xl mx-auto bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
          <span className="italic">game</span>State
        </h1>
        <img
          className=""
          src={gameConsole}
          alt="gameConsole enlarged image"
          width={150}
        />
        <h2 className="animate-pulse py-1 font-bold text-4xl mx-auto bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
          Loading...
        </h2>
      </div>
    </div>
  );
}
