import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
      console.log(searchResult);
    }
  };

  useEffect(() => {
    displayVideos();
  }, []);

  return (
    <div className="results">
      {results && (
        <div className="videos">
          {results.data.data.map((video) => (
            <Link to={video.uri} className="videoLink">
              <div className="videoWrapper">
                <img src={video.pictures.sizes[1].link} alt="" />
                <p>{video.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
