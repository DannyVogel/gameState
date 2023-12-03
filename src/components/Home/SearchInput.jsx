import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  function handleChange(e) {
    const { value } = e.target;
    setSearchTerm(value);
  }

  const processSearch = async (e) => {
    if (searchTerm === "") {
      e.preventDefault();
      setErrorMessage("Please enter a search term");
      return;
    }
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <>
      <form className="join" onSubmit={processSearch}>
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
        <button type="submit"></button>
        <NavLink
          to={`/search/${searchTerm}`}
          className="btn btn-outline btn-primary border-l-0 join-item rounded-r-lg"
          disabled={searchTerm === ""}
        >
          Search
        </NavLink>
      </form>
      {errorMessage && (
        <p className="text-center text-red-500 mt-2">{errorMessage}</p>
      )}
    </>
  );
};

export default SearchInput;
