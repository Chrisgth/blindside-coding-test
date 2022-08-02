import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ setNavSearch, input, setInput }) => {
  useEffect(() => {
    setNavSearch(false);
  }, []);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <h3>Search for videos here!</h3>
      <div className="searchBar">
        <input type="text" value={input} onChange={(e) => onChangeHandler(e)} />
        <Link to={`/videos?query=${input ? input : "cats"}`}>Search</Link>
      </div>
    </div>
  );
};

export default Search;
