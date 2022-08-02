import { useEffect, useState } from "react";
import { getVideos } from "../services/getVideos";

const Search = ({ setNavSearch }) => {
  const [input, setInput] = useState("");
  useEffect(() => {
    setNavSearch(false);
  }, []);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onClickHandler = async () => {
    if (input === "") {
      return;
    } else {
      const config = {
        params: {
          query: input,
        },
        headers: { Authorization: `Bearer ${process.env.REACT_APP_APP_KEY}` },
      };
      const searchResult = await getVideos(config);
      console.log(searchResult);
    }
  };

  return (
    <div className="search">
      <h3>Search for videos here!</h3>
      <div className="searchBar">
        <input type="text" value={input} onChange={(e) => onChangeHandler(e)} />
        <button className="smallButton" onClick={onClickHandler}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
