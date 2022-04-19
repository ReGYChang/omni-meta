import React from "react";
import ReactDOM from "react-dom";
import Snowfall from 'react-snowfall'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./styles/reset.css";
import "./styles/theme.css";

ReactDOM.render(
  <div style={{ height: 1000, background: '#282c34', position: 'relative' }}>
    <Snowfall />
    <Provider store={store}>
      <App />
    </Provider>,
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
