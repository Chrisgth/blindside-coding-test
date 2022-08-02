import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-ylsg2zq6.us.auth0.com"
    clientId="TrmLIlu4h34g4ko86NF9zx28lGrsjw6N"
    redirectUri={"http://localhost:3000/search"}
  >
    <App />
  </Auth0Provider>
);
