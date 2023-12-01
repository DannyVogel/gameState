import { useState } from "react";
import { FireStoreController } from "@/services/api/firestore";
import Index from "@/components/Home/Index";
import GameCard from "@/components/GameCard";
import Result from "@/utility/resultsConstructor";
import TriangleLoader from "@/components/TriangleLoader";

export default function GameSearch() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [num, setNum] = useState(0);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setSearchTerm(value);
  }

  const processSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNum(0);
    setMessage("");
    try {
      const results = await FireStoreController.searchGames(searchTerm);
      if (results.length === 0) {
        setMessage("No results found");
      }
      setSearchTerm("");
      setResults(results.map((result) => new Result(result)));
    } catch (error) {}
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  function renderFiveResults(results) {
    return results.map((result, index) => {
      if (index >= num + 0 && index < num + 3) {
        return <GameCard key={result.id} result={result} />;
      }
    });
  }

  return (
    <div className="mb-14">
      <div className="flex flex-col items-center">
        {loading ? (
          <TriangleLoader />
        ) : results.length > 0 ? (
          <>
            {renderFiveResults(results)}
            <div className="flex justify-around">
              {num > 0 ? (
                <p
                  className={`btn btn-outline btn-sm ${
                    num < results.length - 3 && "rounded-r-none"
                  }`}
                  onClick={() => setNum((prevNum) => (prevNum -= 3))}
                >
                  Previous Page
                </p>
              ) : null}
              {num > 0 && num < results.length - 3 && (
                <p className="btn no-animation btn-outline btn-sm btm-nav-label rounded-none cursor-default">
                  - {num / 3 + 1} -
                </p>
              )}
              {num < results.length - 3 && (
                <p
                  className={`btn btn-outline btn-sm ${
                    num > 0 && "rounded-l-none"
                  }`}
                  onClick={() => setNum((prevNum) => (prevNum += 3))}
                >
                  Next Page
                </p>
              )}
            </div>
            <button
              onClick={() => setResults(0)}
              className="mt-4 btn btn-secondary btn-sm"
            >
              New Search
            </button>
          </>
        ) : (
          <>
            <Index />
            <form
              className="mt-20 flex flex-col items-center"
              onSubmit={processSearch}
            >
              <div className="join">
                <input
                  className="input input-bordered border-r-0 input-primary join-item"
                  type="text"
                  id="searchTerm"
                  name="searchTerm"
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Find your game"
                  autoComplete="off"
                />
                <div className="">
                  <button
                    type="submit"
                    className="btn btn-outline btn-primary border-l-0 join-item"
                  >
                    Search
                  </button>
                </div>
              </div>
              <p className="mt-2 text-white">{message}</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
