import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/Spinner';
import { getVideos } from '../services/getVideos';
import Left from '../images/left-arrow.png';
import Right from '../images/right-arrow.png';

const Videos = ({ setNavSearch, input, setInput }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState();
  const [resultsLoading, setResultsLoading] = useState(true);
  let query;
  let page;

  const displayVideos = async () => {
    if (query === '') {
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
      setResultsLoading(false);
      setNavSearch(true);
    }
  };

  const getPage = (direction) => {
    if (direction === 'left') {
      setSearchParams({
        query: searchParams.get('query'),
        page: Number(searchParams.get('page')) - 1,
      });
    }
    if (direction === 'right') {
      setSearchParams({
        query: searchParams.get('query'),
        page: Number(searchParams.get('page')) + 1,
      });
    }
  };

  useEffect(() => {
    query = searchParams.get('query');
    page = searchParams.get('page');
    displayVideos();
  }, [searchParams]);

  useEffect(() => {
    if (input === '') {
      setInput(query);
    }
  }, []);

  return (
    <div className="results">
      {resultsLoading && <LoadingSpinner />}
      {results && results.data.total === 0 && <h4>No videos were found. Refine your search.</h4>}
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
      {results && results.data.data.length !== 0 && (
        <div className="pages">
          {results.data.paging.previous !== null && (
            <img src={Left} alt="left arrow" onClick={() => getPage('left')} />
          )}
          <p>{results.data.page}</p>
          {results.data.paging.next !== null && (
            <img src={Right} alt="right arrow" onClick={() => getPage('right')} />
          )}
        </div>
      )}
    </div>
  );
};

export default Videos;
