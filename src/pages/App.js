import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Nav from "../components/Nav";
import LoadingSpinner from "../components/Spinner";
import Login from "./Login";
import Search from "./Search";
import Videos from "./Results";
import Video from "./Video";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [navSearch, setNavSearch] = useState(false);
  const [input, setInput] = useState("");

  if (isLoading) {
    return (
      <div className="appLoading">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <Router>
      <div className="app">
        <Nav navSearch={navSearch} input={input} setInput={setInput} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/search" />}
            />
            <Route
              path="/search"
              element={
                user && isAuthenticated ? (
                  <Search
                    navSearch={navSearch}
                    setNavSearch={setNavSearch}
                    input={input}
                    setInput={setInput}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/videos"
              element={
                user && isAuthenticated ? (
                  <Videos setNavSearch={setNavSearch} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/videos/:id"
              element={
                user && isAuthenticated ? (
                  <Video setNavSearch={setNavSearch} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
