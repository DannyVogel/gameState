import React from "react";

export default function UserDataModal(props) {
  const {
    handleShowModal,
    handleSubmit,
    handleChange,
    userPlayedGameData,
    result,
  } = props;

  return (
    <div className="fixed p-5 bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 bg-slate-800 z-50 rounded-lg max-w-xl">
      <p
        className="font-bold text-right mb-2 cursor-pointer"
        onClick={handleShowModal}
      >
        x
      </p>
      <form
        className="flex flex-col gap-1"
        id="gamesPlayedList"
        onSubmit={(e) => handleSubmit(e, result)}
      >
        <div className="flex justify-between">
          <span>Date Played:</span>
          <div>
            <input
              type="number"
              name="monthPlayed"
              id="monthPlayed"
              min={1}
              max={12}
              value={userPlayedGameData.monthPlayed}
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
              value={userPlayedGameData.yearPlayed}
              onChange={handleChange}
              placeholder="YYYY"
              required
              className="input input-primary input-sm"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <span>Game status:</span>
          <select
            name="status"
            value={userPlayedGameData.status}
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
            rows={2}
            cols={25}
            value={userPlayedGameData.comments}
            onChange={handleChange}
            className="textarea textarea-primary textarea-bordered textarea-sm"
          />
        </div>
        <button className="btn btn-primary btn-sm my-2" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
