import { useState } from "react";

export default function ImageGallery(props) {
  const [num, setNum] = useState(0);

  function handleClick(e) {
    const side = e.target.id;
    if (side === "left") {
      num > 0
        ? setNum((prevNum) => (prevNum -= 1))
        : setNum(props.screenshots.length - 1);
    } else if (side === "right") {
      num < props.screenshots.length - 1
        ? setNum((prevNum) => (prevNum += 1))
        : setNum(0);
    }
  }

  return (
    <div className="relative">
      <div
        id="left"
        className="absolute top-0 left-0 font-bold text-lg bg-gray-500/30 min-h-full flex items-center cursor-pointer"
        onClick={handleClick}
      >
        <p id="left" onClick={handleClick}>
          {" "}
          {"<"}{" "}
        </p>
      </div>
      <img
        className="image"
        src={props.screenshots && props.screenshots[num]}
      />
      <div
        id="right"
        className="absolute top-0 right-0 font-bold text-lg bg-gray-500/30 min-h-full flex items-center cursor-pointer"
        onClick={handleClick}
      >
        <p id="right" onClick={handleClick}>
          {" "}
          {">"}{" "}
        </p>
      </div>
    </div>
  );
}
