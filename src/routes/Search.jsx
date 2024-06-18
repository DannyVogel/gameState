import React, { useState, useEffect } from "react";
import { defer, Await, useLoaderData, useParams } from "react-router-dom";
import { SearchController } from "@/services/api/search";
import GameCard from "@/components/GameCard";
import TriangleLoader from "@/components/TriangleLoader";
import SearchInput from "@/components/Home/SearchInput";

export async function loader({ request, params }) {
  return defer({
    results: SearchController.search(params.searchTerm),
  });
}

const Search = () => {
  const [num, setNum] = useState(0);
  const [resultsTotal, setResultsTotal] = useState([]);
  const resultsPromise = useLoaderData();

  useEffect(() => {
    const getTotalResults = async () => {
      setResultsTotal(await resultsPromise.results);
    };
    getTotalResults();
  }, [resultsPromise.results]);

  function renderFiveResults(results) {
    return results.map((result, index) => {
      if (index >= num + 0 && index < num + 3) {
        return <GameCard key={result.id} result={result} />;
      }
    });
  }
  return (
    <div className="text-primary mb-14 flex flex-col items-center gap-4">
      <React.Suspense fallback={<TriangleLoader />}>
        {resultsPromise.results !== null &&
        resultsPromise.results.length > 0 ? (
          <>
            <Await resolve={resultsPromise.results}>{renderFiveResults}</Await>
            <div className="flex justify-around">
              {num > 0 ? (
                <p
                  className={`btn btn-outline btn-sm ${
                    num < resultsTotal.length - 3 && "rounded-r-none"
                  }`}
                  onClick={() => setNum((prevNum) => (prevNum -= 3))}
                >
                  Previous Page
                </p>
              ) : null}
              {num > 0 && num < resultsTotal.length - 3 && (
                <p className="btn no-animation btn-outline btn-sm btm-nav-label rounded-none cursor-default">
                  - {num / 3 + 1} -
                </p>
              )}
              {num < resultsTotal.length - 3 && (
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
          </>
        ) : (
          <p className="mt-20">No results found.</p>
        )}
        <SearchInput />
      </React.Suspense>
    </div>
  );
};

export default Search;
