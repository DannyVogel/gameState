import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { db, ref, onValue } from "@/config/firebase";
import GamesPlayedCard from "@/components/GamesPlayedCard";
import useUserStore from "@/stores/userStore";

export default function GamesPlayed() {
  const UID = useUserStore((state) => state.UID);
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState({
    yearPlayed: "",
    status: "",
  });
  const [filterInput, setFilterInput] = useState({
    yearPlayed: "",
    status: "",
  });

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
    setShowFilters(false);
  }

  useEffect(() => {
    const listRef = ref(db, `gameState/users/${UID}/gameList`);
    onValue(listRef, (snapshot) => {
      const data = snapshot.exists() ? Object.values(snapshot.val()) : [];
      setGameList(data);
    });
    setTimeout(() => setLoading(false), 500);
  }, []);

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
          return (
            <p className="text-center pt-24">
              Please sign up or sign in to see list
            </p>
          );
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

      return years.map((year, index) => (
        <div className="gameCardContainer" key={index}>
          <h2 className="w-fit font-bold text-xl bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
            {year}
          </h2>
          {sortedDataByYear
            .filter((item) => item.yearPlayed === year)
            .map((item) => (
              <GamesPlayedCard key={item.id} result={item} />
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
          {UID && (
            <form className="my-2 flex flex-col items-start gap-y-4">
              <div className="mx-auto flex flex-col items-center gap-2">
                <i
                  className="fa-solid fa-filter cursor-pointer"
                  onClick={() => setShowFilters((prevState) => !prevState)}
                ></i>
                {showFilters && (
                  <div className="flex justify-center gap-2">
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
                )}
              </div>
            </form>
          )}
          {renderList(gameList, filter)}
        </>
      )}
    </div>
  );
}
