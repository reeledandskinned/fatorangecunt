// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";               // <- must include .js
import reportWebVitals from "./reportWebVitals.js"; // <- include .js
import "./index.css";                     // optional

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// You can keep measuring performance if you want
reportWebVitals();