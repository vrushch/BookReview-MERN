import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import "./index.css";
import { AuthTokenProvider } from "./auth/AuthTokenContext";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/material-icons/css/material-icons.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <AuthTokenProvider>
        <App />
      </AuthTokenProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
  //<React.StrictMode>
  //<BrowserRouter>
  //    <App />
  //</BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
