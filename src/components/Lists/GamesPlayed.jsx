import React, { useState, useEffect } from "react";
import GamesPlayedCard from "@/components/GamesPlayedCard";
import { db, ref, onValue } from "@/config/firebase";
import { Triangle } from "react-loader-spinner";
import useUserStore from "@/stores/userStore";
import { FireStoreController } from "@/services/api/firestore";

export default function GamesPlayed() {
  const UID = useUserStore((state) => state.UID);
  const [loading, setLoading] = useState(true);
  // const [showFilters, setShowFilters] = useState(false);
  const [savedList, setSavedList] = useState(() => []);
  const [filter, setFilter] = useState({
    yearPlayed: "",
    status: "",
  });
  const [filterInput, setFilterInput] = useState({
    yearPlayed: "",
    status: "",
  });

  // function handleShowFilters(e) {
  //   e.preventDefault();
  //   setShowFilters((prev) => !prev);
  // }

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setFilterInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function applyFilters(e) {
    e.preventDefault();
    setFilter(filterInput);
  }

  function clearFilters(e) {
    e.preventDefault();
    setFilterInput({ yearPlayed: "", status: "" });
    setFilter({ yearPlayed: "", status: "" });
  }

  useEffect(() => {
    try {
      const listRef = ref(db, `gameState/users/${UID}/gameList`);
      onValue(listRef, (snapshot) => {
        const data = snapshot.exists() ? Object.values(snapshot.val()) : [];
        setSavedList(data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  function migrate() {
    let oldData;
    const gameRef = ref(db, `gameState/users/${UID}/gamesPlayedList`);
    onValue(gameRef, (snapshot) => {
      oldData = snapshot.exists() ? Object.values(snapshot.val()) : [];
    });

    console.log("oldData", oldData.flat());
    oldData.flat().forEach((game) => {
      FireStoreController.addToList(UID, game);
    });
  }

  function renderList(list, filters) {
    let filteredList = list.filter((game) => game.status !== "toPlay");
    try {
      if (filters.yearPlayed !== "") {
        filteredList = filteredList.filter(
          (game) => game.yearPlayed === filters.yearPlayed
        );
      }
      if (filters.status !== "") {
        filteredList = filteredList.filter(
          (game) => game.status === filters.status
        );
      }
      if (filteredList.length < 1) {
        if (!UID) {
          return <p>Please sign up or sign in to see list</p>;
        }
        return <p>No games found</p>;
      }
      const sortedDataByMonth = filteredList?.sort(
        (a, b) => b.monthPlayed - a.monthPlayed
      );
      const sortedDataByYear = sortedDataByMonth.sort(
        (a, b) => b.yearPlayed - a.yearPlayed
      );
      const years = [
        ...new Set(sortedDataByYear.map((item) => item.yearPlayed)),
      ];
      return years.map((year) => (
        <div className="gameCardContainer" key={year}>
          <h2 className="w-fit font-bold text-xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
            {year}
          </h2>
          {sortedDataByYear
            .filter((item) => item.yearPlayed === year)
            .map((item) => (
              <GamesPlayedCard key={item.id} result={item} userUID={UID} />
            ))}
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mb-14">
      <h1 className="text-center font-bold text-2xl">Games Played</h1>
      {/* <button className="btn btn-primary" onClick={migrate}>
        Migrate
      </button> */}
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
                  <div className="flex gap-2">
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
