import React, { useEffect, useState } from "react";
import FireStoreController from "@/services/api/firestore";
import UserDataModal from "@/components/UserDataModal";
import useUserStore from "@/stores/userStore";
import notFound from "@/assets/notFound.png";

export default function GameCard(props) {
  const UID = useUserStore((state) => state.UID);
  const [isOnList, setIsOnList] = useState("");
  const [userPlayedGameData, setUserPlayedGameData] = useState({
    monthPlayed: (new Date().getUTCMonth() + 1).toString(),
    yearPlayed: new Date().getFullYear().toString(),
    comments: "",
    status: "playing",
  });
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  useEffect(() => {
    if (props.onList === "gamesToPlayList") {
      setIsOnList("gamesToPlayList");
    } else if (props.onList === "gamesPlayedList") {
      setIsOnList("gamesPlayedList");
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserPlayedGameData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e, game) {
    e.preventDefault();
    setShowModal(false);
    const gameData = { ...game, ...userPlayedGameData };
    addGameToList(e, gameData);
  }

  function handleShowModal() {
    setShowModal((prev) => !prev);
  }

  function addGameToList(e, game) {
    if (!UID) {
      setShowConfirmationModal(true);
      setConfirmationText("Log in to add games to a list");
      setTimeout(() => {
        setShowConfirmationModal(false);
      }, 1500);
      return;
    }
    const list = e.target.id;
    if (list === "gamesToPlayList") {
      game.status = "toPlay";
    }
    FireStoreController.addToList(UID, game);
    setShowConfirmationModal(true);
    setConfirmationText("Added to list");
    setTimeout(() => {
      setShowConfirmationModal(false);
    }, 1500);
  }

  function removeFromList(e) {
    setShowConfirmationModal(true);
    setConfirmationText("Removed from list");
    setTimeout(() => {
      setShowConfirmationModal(false);
      if (e.target.id) {
        FireStoreController.removeFromList(UID, e.target.id);
      }
    }, 1500);
  }

  let buttonContainerElement = "";

  if (isOnList === "") {
    buttonContainerElement = (
      <div className="w-full flex justify-between">
        <button
          id="gamesToPlayList"
          className="btn btn-outline btn-sm btn-secondary"
          onClick={(e) => addGameToList(e, props.result)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Want to play
        </button>
        <button
          id="gamesPlayedList"
          className="btn btn-outline btn-sm btn-warning"
          onClick={handleShowModal}
        >
          Played
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        {showModal ? (
          <UserDataModal
            handleShowModal={handleShowModal}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            userPlayedGameData={userPlayedGameData}
            result={props.result}
          />
        ) : null}
      </div>
    );
  } else if (isOnList === "gamesPlayedList") {
    buttonContainerElement = (
      <div className="w-full flex justify-between">
        <button
          id={props.result.id}
          className="resultButton purple btn"
          onClick={removeFromList}
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div
      key={props.result.id}
      className="card card-compact max-w-md  glass my-4 mx-auto"
    >
      <figure>
        {props.result.image ? (
          <img src={props.result.image} alt={props.result.name} />
        ) : (
          <img src={notFound} alt="image not found placeholder" />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <a
            className="bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
            href={`https://www.igdb.com/games/${props.result.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            {props.result.name}{" "}
          </a>
        </h2>
        <p className="flex justify-around">
          {props.result.genres.map((genre, index, array) => (
            <React.Fragment key={genre}>
              <button className="btn btn-outline btn-xs cursor-default">
                {genre}
              </button>
            </React.Fragment>
          ))}
        </p>
        <p className="resultText">Released: {props.result.released}</p>
        <a
          className="link text-primary"
          href={`https://www.igdb.com/games/${props.result.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          More Info
        </a>
        <div className="card-actions">
          {buttonContainerElement}
          {showConfirmationModal ? (
            <div className="font-bold text-lg px-5 py-5 absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 bg-green-700 z-20 rounded-lg max-w-xl shadow-lg shadow-black">
              <p className="text-center">{confirmationText}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
