import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getVideos } from "../services/getVideos";

const Videos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState();
  let query = searchParams.get("query");
  let page = searchParams.get("page");

  const displayVideos = async () => {
    if (query === "") {
      return;
    } else {
      const config = {
        params: {
          query: query,
          page: page,
        },
        headers: { Authorization: `Bearer ${process.env.REACT_APP_APP_KEY}` },
      };
      const searchResult = await getVideos(config);
      setResults(searchResult);
    }
  };

  useEffect(() => {
    displayVideos();
  }, []);

  return <div className="videos"></div>;
};

export default Videos;
