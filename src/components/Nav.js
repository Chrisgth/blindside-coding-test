import { useAuth0 } from "@auth0/auth0-react";

const Nav = ({ navSearch }) => {
  const { logout, user } = useAuth0();

  return (
    <div className="nav">
      <h2>Video Player</h2>
      {user && navSearch && (
        <div className="navSearch">
          <input type="text" />
          <button className="smallButton">Search</button>
        </div>
      )}
      {user && (
        <div className="profile">
          <p>Welcome {user.given_name}!</p>
          <button
            onClick={() => logout({ returnTo: "http://localhost:3000/login" })}
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
