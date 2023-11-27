import React, { useState, useEffect } from "react";
import useUserStore from "../stores/userStore";
export default function WelcomeSplash(props) {
  const user = useUserStore((state) => state.user);
  const UID = useUserStore((state) => state.UID);
  let userName = props.user.charAt(0).toUpperCase() + props.user.slice(1);
  if (userName == "Kelevrav") {
    userName = userName.slice(0, -1);
  }
  const [name, setName] = useState("");
  function handleChange(e) {
    const { value } = e.target;
    setName(value);
  }
  function updateUser(e) {
    e.preventDefault();
    setUser(name);
  }
  return (
    <>
      {!UID ? (
        <div className="welcomeContainer">
          <div className="iconContainer">
            <h1 className="headerTitle">Find Games!</h1>
            <p className="text-red-500">User: {user}</p>
            <p className="text-red-500">UID: {UID}</p>
            {/* <form onSubmit={updateUser}>
              <input
                id="searchTerm"
                name="searchTerm"
                value={name}
                onChange={handleChange}
                className="input input-primary"
              ></input>
              <button className="btn btn-primary">Set user</button>
            </form> */}
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
                src="./gamesToPlay1.png"
                alt="shopping bag with controller icon"
              />
              <p className="headerTitle">
                Games <span>{<br />}</span> to play
              </p>
            </div>
            <div className="iconContainer">
              <img
                className="w-8 h-8"
                src="./gamesPlayed1.png"
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
      ) : (
        <div>
          <h1 className="headerTitle">Welcome back</h1>
          <h1 className="headerTitle">{userName}</h1>
          <br />
          <br />
          <br />
          <br />
          <div className="listsContainer">
            <div className="iconContainer">
              <img
                className="w-8 h-8"
                src="./gamesToPlay1.png"
                alt="shopping bag with controller icon"
              />
              <p className="headerTitle">
                Games <span>{<br />}</span> to play
              </p>
              <p>{props.gamesToPlayList.length} games listed</p>
            </div>
            <div className="iconContainer">
              <img
                className="w-8 h-8"
                src="./gamesPlayed1.png"
                alt="papers with controller icon"
              />
              <p className="headerTitle">
                Games <span>{<br />}</span> played
              </p>
              <p>{props.gamesPlayedList.length} games listed</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
