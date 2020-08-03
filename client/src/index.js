import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
