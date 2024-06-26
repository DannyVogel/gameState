import { useState, useEffect } from "react";
import ImageGallery from "@/components/ImageGallery";
import FireStoreController from "@/services/api/firestore";
import useUserStore from "@/stores/userStore";
export default function GamesPlayedCard(props) {
  const {
    id,
    name,
    monthPlayed,
    yearPlayed,
    comments,
    status,
    image,
    released,
    slug,
    platforms,
    screenshots,
  } = props.result;

  const UID = useUserStore((state) => state.UID);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [editItemData, setEditItemData] = useState({
    monthPlayed: monthPlayed || (new Date().getUTCMonth() + 1).toString(),
    yearPlayed: yearPlayed || new Date().getFullYear().toString(),
    status: status,
    comments: comments,
  });

  function removeFromList(e) {
    FireStoreController.removeFromList(UID, e.target.id);
  }

  function handleEdit() {
    setEditItem(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditItemData((prev) => ({ ...prev, [name]: value }));
  }

  function updateItem(e) {
    e.preventDefault();
    setEditItem(false);
    const gameData = { ...props.result, ...editItemData };
    FireStoreController.addToList(UID, gameData);
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
        className="relative my-1 card glass card-side card-compact bg-base-100 shadow-xl border border-primary rounded-lg grid grid-cols-3 cursor-pointer "
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
            <div className="flex gap-2 text-xs">
              <p>
                Played: {monthPlayed}
                {monthPlayed && yearPlayed ? "-" : null}
                {yearPlayed}
              </p>
              <p>{status ? `Status: ${status}` : null}</p>
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
              <ImageGallery screenshots={screenshots} />
              <h2 className="px-5 text-2xl w-max font-bold bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
                <a
                  href={`https://www.igdb.com/games/${slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              </h2>
              <div className="flex flex-col gap-1 px-5">
                <div className="flex justify-between items-center">
                  <p>Released: {released}</p>
                  <button className="btn btn-outline btn-sm cursor-default">
                    {status}
                  </button>
                </div>
                <p>Platforms: {platforms && platforms.join(", ")}</p>
                {editItem ? (
                  <form className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span>Date Played:</span>
                      <div>
                        <input
                          type="number"
                          name="monthPlayed"
                          id="monthPlayed"
                          min={1}
                          max={12}
                          value={editItemData.monthPlayed}
                          onChange={handleChange}
                          placeholder="MM"
                          className="input input-primary input-sm"
                        />
                        -
                        <input
                          type="number"
                          name="yearPlayed"
                          id="yearPlayed"
                          min={1900}
                          max={3000}
                          value={editItemData.yearPlayed}
                          onChange={handleChange}
                          placeholder="YYYY"
                          required
                          className="input input-primary input-sm"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <select
                        name="status"
                        value={editItemData.status}
                        onChange={handleChange}
                        className="select select-primary select-sm"
                      >
                        <option value="playing">Playing</option>
                        <option value="beat">Beat</option>
                        <option value="dropped">Dropped</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <label htmlFor="comments">Comments:</label>
                      <textarea
                        name="comments"
                        id="comments"
                        rows={1}
                        cols={25}
                        value={editItemData.comments}
                        onChange={handleChange}
                        className="textarea textarea-primary textarea-bordered textarea-sm"
                      />
                    </div>
                  </form>
                ) : (
                  <>
                    <p>
                      Played: {monthPlayed} - {yearPlayed}
                    </p>
                    <p>Comments: {comments}</p>
                  </>
                )}
              </div>
              <div className="flex justify-around mt-2 mb-5">
                {!editItem && (
                  <>
                    <button
                      id={id}
                      className="btn btn-outline btn-error btn-sm"
                      onClick={removeFromList}
                    >
                      Remove
                    </button>
                    <div
                      id="closeModal"
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </div>
                  </>
                )}
                <button
                  id={id}
                  className={`resultButton ${
                    editItem ? "btn bg-green-500" : "btn-primary"
                  } btn btn-sm`}
                  onClick={editItem ? updateItem : handleEdit}
                >
                  {editItem ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
