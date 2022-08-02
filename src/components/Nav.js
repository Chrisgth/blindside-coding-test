import { useAuth0 } from "@auth0/auth0-react";

const Nav = () => {
  const { logout, user } = useAuth0();

  return (
    <div className="nav">
      <h2>Video Player</h2>
      {user && (
        <div className="navSearch">
          <input type="text" />
          <button>Search</button>
        </div>
      )}
      {user && (
        <button
          onClick={() => logout({ returnTo: "http://localhost:3000/login" })}
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default Nav;
