import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Nav from "../components/Nav";
import Login from "./Login";
import Search from "./Search";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user, isAuthenticated, isLoading);

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <Router>
      <div className="app">
        <Nav />
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
                user && isAuthenticated ? <Search /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
