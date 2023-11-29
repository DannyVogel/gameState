import React, { useState, useEffect } from "react";
import GamesPlayedCard from "../GamesPlayedCard";
import { db, ref, onValue } from "../../config/firebase";
import { Triangle } from "react-loader-spinner";
import useUserStore from "../../stores/userStore";

export default function GamesPlayed() {
  const UID = useUserStore((state) => state.UID);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [savedList, setSavedList] = useState(() => []);
  const [filter, setFilter] = useState({
    yearPlayed: "",
    status: "",
  });
  const [filterInput, setFilterInput] = useState({
    yearPlayed: "",
    status: "",
  });

  function handleShowFilters(e) {
    e.preventDefault();
    setShowFilters((prev) => !prev);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFilterInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function applyFilters(e) {
    e.preventDefault();
    setFilter(filterInput);
    setShowFilters(false);
  }

  function clearFilters(e) {
    e.preventDefault();
    setFilterInput({ yearPlayed: "", status: "" });
    setFilter({ yearPlayed: "", status: "" });
  }

  useEffect(() => {
    const gameRef = ref(db, `gameState/users/${UID}/gamesPlayedList`);
    onValue(gameRef, (snapshot) => {
      const data = snapshot.exists() ? Object.values(snapshot.val()) : [];
      setSavedList(data);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [savedList]);

  function renderList(list, filters) {
    if (filters.yearPlayed !== "") {
      list = list.filter((game) => game[0].yearPlayed === filters.yearPlayed);
    }
    if (filters.status !== "") {
      list = list.filter((game) => game[0].status === filters.status);
    }
    if (list.length < 1) {
      if (!UID) {
        return <p>Please sign up or sign in to see list</p>;
      }
      return <p>No games found</p>;
    }
    const sortedDataByMonth = list?.sort(
      (a, b) => b[0].monthPlayed - a[0].monthPlayed
    );
    const sortedDataByYear = sortedDataByMonth.sort(
      (a, b) => b[0].yearPlayed - a[0].yearPlayed
    );
    const years = [
      ...new Set(sortedDataByYear.map((item) => item[0].yearPlayed)),
    ];
    return years.map((year) => (
      <div className="gameCardContainer" key={year}>
        <h2 className="w-fit font-bold text-xl bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
          {year}
        </h2>
        {sortedDataByYear
          .filter((item) => item[0].yearPlayed === year)
          .map((item) => (
            <GamesPlayedCard key={item[0].id} result={item[0]} userUID={UID} />
          ))}
      </div>
    ));
  }

  return (
    <div className="">
      <h1 className="text-center font-bold text-2xl">Games Played</h1>
      {loading ? (
        <Triangle
          height="80"
          width="80"
          color="#FFFFFF"
          ariaLabel="triangle-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <>
          <form className="flex flex-col items-start gap-y-4">
            <div className="mt-4">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="m-1">
                  <i className="fa-solid fa-filter cursor-pointer"></i>
                </div>
                <ul className="dropdown-content z-[1] p-2 bg-blue-700 rounded-box">
                  <p className="w-max mb-1 font-bold">Filters:</p>
                  <div class="flex gap-2">
                    <input
                      className="input input-primary input-sm"
                      type="number"
                      name="yearPlayed"
                      id="yearPlayed"
                      min={1900}
                      max={3000}
                      value={filterInput.yearPlayed}
                      onChange={handleChange}
                      placeholder="YYYY"
                    />
                    <select
                      className="select select-primary select-sm"
                      name="status"
                      id="status"
                      value={filterInput.status}
                      onChange={handleChange}
                    >
                      <option value="">Status</option>
                      <option value="playing">Playing</option>
                      <option value="beat">Beat</option>
                      <option value="dropped">Dropped</option>
                    </select>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={applyFilters}
                    >
                      Set
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={clearFilters}
                    >
                      Clear
                    </button>
                  </div>
                </ul>
              </div>
            </div>
            <div className="mx-auto flex gap-2"></div>
          </form>
          {renderList(savedList, filter)}
        </>
      )}
    </div>
  );
}