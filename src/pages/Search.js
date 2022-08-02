import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Search = ({ setNavSearch }) => {
  useEffect(() => {
    setNavSearch(false);
  }, []);
  return (
    <div className="search">
      <h3>Search for videos here!</h3>
      <div className="searchBar">
        <input type="text" />
        <button className="smallButton">Search</button>
      </div>
    </div>
  );
};

export default Search;
