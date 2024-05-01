import React, { useState, useEffect } from "react";
import ImageGallery from "@/components/ImageGallery";
import UserDataModal from "@/components/UserDataModal";
import useUserStore from "@/stores/userStore";
import FireStoreController from "@/services/api/firestore";
import notFound from "@/assets/notFound.png";

export default function GamesPlayedCard(props) {
  const { id, name, released, slug, platforms, image, screenshots } =
    props.result;
  const UID = useUserStore((state) => state.UID);

  const [showModal, setShowModal] = useState(false);
  const [showUserDataModal, setShowUserDataModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [userPlayedGameData, setUserPlayedGameData] = useState({
    monthPlayed: (new Date().getUTCMonth() + 1).toString(),
    yearPlayed: new Date().getFullYear().toString(),
    comments: "",
    status: "playing",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setUserPlayedGameData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e, game) {
    e.preventDefault();
    setShowModal(false);
    const gameData = { ...game, ...userPlayedGameData };
    addToList(e, gameData);
  }

  function toggleShowUserDataModal() {
    setShowUserDataModal((prev) => !prev);
  }

  function addToList(e, game) {
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

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showModal]);

  return (
    <>
      <div
        className="relative my-1 card glass card-side card-compact bg-base-100 shadow-xl border border-primary rounded-lg grid grid-cols-3"
        onClick={() => setShowModal(true)}
      >
        <figure>
          <img src={image} alt={name} className=" rounded-l-lg h-full w-full" />
        </figure>
        <div className="max-w-full card-body col-span-2 grid grid-rows-2">
          <h4 className="text-base flex items-center font-bold bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent truncate">
            {name}
          </h4>
          <div className="flex items-center justify-between font-bold">
            <div className="flex gap-3 text-xs">
              <p>Release Date: {released}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-gray-500 via-transparent to-transparent flex items-baseline justify-end">
          <span className="pt-1 text-primary text-opacity-40 ">+</span>
        </div>
      </div>
      {showModal && (
        <>
          <div
            className="fixed top-0 right-0 h-full w-full bg-black opacity-50 z-10"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="fixed bottom-0 sm:bottom-1/2 sm:translate-y-1/2 right-1/2 translate-x-1/2 w-full bg-slate-800 z-20 rounded-t-lg sm:rounded-lg max-w-xl">
            <div className="flex flex-col gap-2">
              <ImageGallery screenshots={screenshots || image || notFound} />
              <h2 className="px-5 text-2xl w-max font-bold bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
                <a
                  href={`https://www.rawg.io/games/${slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              </h2>
              <div className="flex flex-col gap-1 px-5">
                <div className="flex justify-between items-center">
                  <p>Release Date: {released ? released : "TBA"}</p>
                </div>
                <p>Platforms: {platforms && platforms.join(", ")}</p>
              </div>
              <div className="flex justify-around mt-2 mb-5">
                <button
                  id={id}
                  className="btn btn-outline btn-error btn-sm"
                  onClick={removeFromList}
                >
                  Remove
                </button>
                <button
                  id="closeModal"
                  className="btn btn-outline btn-success btn-sm"
                  onClick={toggleShowUserDataModal}
                >
                  I played it
                </button>
                {showUserDataModal ? (
                  <UserDataModal
                    handleShowModal={toggleShowUserDataModal}
                    handleSubmit={onSubmit}
                    handleChange={onChange}
                    userPlayedGameData={userPlayedGameData}
                    result={props.result}
                  />
                ) : null}
                {showConfirmationModal ? (
                  <div className="font-bold text-lg px-5 py-5 absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 bg-green-700 z-20 rounded-lg max-w-xl shadow-lg shadow-black">
                    <p>{confirmationText}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
