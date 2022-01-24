import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./global/GlobalStyles";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <>
    <GlobalStyle />
    <HashRouter>
      <App />
    </HashRouter>
  </>,
  document.getElementById("app")
);
