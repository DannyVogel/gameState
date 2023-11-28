import React, { useEffect, useState } from "react";
import Index from "@/components/Home/Index";
import GameCard from "./GameCard";
import Result from "../utility/resultsConstructor";
import { Triangle } from "react-loader-spinner";

export default function GameSearch(props) {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [num, setNum] = useState(0);

  function handleChange(e) {
    const { value } = e.target;
    setSearchTerm(value);
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [results]);

  function processSearch(e) {
    e.preventDefault();
    setNum(0);
    fetch(
      `https://api.rawg.io/api/games?key=${
        import.meta.env.VITE_RAWG_API_KEY
      }&search=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results.map((result) => new Result(result)));
      });
    setSearchTerm("");
  }

  function renderFiveResults(results) {
    return results.map((result, index) => {
      if (index >= num + 0 && index < num + 3) {
        return (
          <GameCard key={result.id} result={result} userUID={props.userUID} />
        );
      }
    });
  }

  return (
    <div className="">
      <div className="flex flex-col items-center">
        {results.length > 0 ? (
          loading ? (
            <Triangle
              height="80"
              width="80"
              color="#FFFFFF"
              ariaLabel="triangle-loading"
              wrapperStyle={{ marginTop: "50px" }}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            renderFiveResults(results)
          )
        ) : (
          <Index />
        )}
        {results.length > 0 && !loading ? (
          <div className="pageSelectContainer">
            {num > 0 ? (
              <p
                className="pageSelectText"
                onClick={() => setNum((prevNum) => (prevNum -= 3))}
              >
                Previous Page
              </p>
            ) : null}
            {num > 0 && num < results.length - 3 && (
              <p className="pageSelectText">-</p>
            )}
            {num < results.length - 3 && (
              <p
                className="pageSelectText"
                onClick={() => setNum((prevNum) => (prevNum += 3))}
              >
                Next Page
              </p>
            )}
          </div>
        ) : null}
      </div>
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
          <div className="indicator">
            <button
              type="submit"
              className="btn btn-outline btn-primary border-l-0 join-item"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
