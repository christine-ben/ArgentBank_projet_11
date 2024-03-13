//React Imports
import React from "react";
import ReactDOM from "react-dom/client";
//Redux Imports
import store from "./store";
import { Provider } from "react-redux";
//Style Imports
import "../src/style/main.css";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
