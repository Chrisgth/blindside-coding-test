import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/Spinner";
import { getVideos } from "../services/getVideos";

const Videos = ({ setNavSearch, input, setInput }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState();
  const [resultsLoading, setResultsLoading] = useState(true);
  let query;
  let page;

  const displayVideos = async () => {
    if (query === "") {
      return;
    } else {
      setNavSearch(false);
      setResultsLoading(true);
      setResults();
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
      setResultsLoading(false);
      setNavSearch(true);
    }
  };
  useEffect(() => {
    query = searchParams.get("query");
    page = searchParams.get("page");
    displayVideos();
  }, [searchParams]);

  useEffect(() => {
    if (input === "") {
      setInput(query);
    }
  }, []);

  return (
    <div className="results">
      {resultsLoading && <LoadingSpinner />}
      {results && results.data.total === 0 && (
        <h4>No videos were found. Refine your search.</h4>
      )}
      {results && (
        <div className="videos">
          {results.data.data.map((video) => (
            <Link to={video.uri} className="videoLink" key={video.uri}>
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
