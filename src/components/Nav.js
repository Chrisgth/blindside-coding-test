import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Nav = ({ navSearch, input, setInput }) => {
  const { logout, user } = useAuth0();
  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="nav">
      <Link to="/search">Video Player</Link>
      {user && navSearch && (
        <div className="navSearch">
          <input type="text" value={input} onChange={(e) => onChangeHandler(e)} />
          <Link className="smallButton" to={`/videos?query=${input ? input : 'cats'}&page=1`}>
            Search
          </Link>
        </div>
      )}
      {user && (
        <div className="profile">
          <p>Welcome {user.given_name}!</p>
          <button
            onClick={() => logout({ returnTo: 'http://localhost:3000/login' })}
            className="smallButton"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
