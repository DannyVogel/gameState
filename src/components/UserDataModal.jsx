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
    <div className="modalContainer">
      <span className="closeModal" onClick={handleShowModal}>
        x
      </span>
      <form
        className="modalForm"
        id="gamesPlayedList"
        onSubmit={(e) => handleSubmit(e, result)}
      >
        <div className="datePlayed">
          <span>Date Played:</span>
          <input
            type="number"
            name="monthPlayed"
            id="monthPlayed"
            min={1}
            max={12}
            value={userPlayedGameData.monthPlayed}
            onChange={handleChange}
            placeholder="MM"
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
          />
        </div>
        <div className="gameCommentsContainer">
          <label htmlFor="comments">Comments:</label>
          <textarea
            name="comments"
            id="comments"
            rows={2}
            cols={25}
            value={userPlayedGameData.comments}
            onChange={handleChange}
          />
        </div>
        <div className="gameStatusContainer">
          <span>Game status:</span>
          <input
            type="radio"
            name="status"
            id="playing"
            value="playing"
            checked={userPlayedGameData.status === "playing"}
            onChange={handleChange}
          />
          <label htmlFor="playing">Playing</label>
          <input
            type="radio"
            name="status"
            id="beat"
            value="beat"
            checked={userPlayedGameData.status === "beat"}
            onChange={handleChange}
          />
          <label htmlFor="beat">Beat</label>
          <input
            type="radio"
            name="status"
            id="dropped"
            value="dropped"
            checked={userPlayedGameData.status === "dropped"}
            onChange={handleChange}
          />
          <label htmlFor="dropped">Dropped</label>
        </div>
        <button className="addToListBtn btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
