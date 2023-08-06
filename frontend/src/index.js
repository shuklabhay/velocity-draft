import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import credentials from "./firebaseConfig.js";

export var url = "https://localhost:3000";

firebase.initializeApp(credentials);

export function regularRequest(handler, method, body, callback) {
  const http = new XMLHttpRequest();
  http.responseType = "json";

  http.open(method, url + handler, true);

  if (body != null) {
    http.setRequestHeader("Content-type", "application/json");
  }
  http.onload = function () {
    callback(http.response);
  };

  http.send(JSON.stringify(body));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
