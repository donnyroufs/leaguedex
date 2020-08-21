import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";
import { AuthProvider } from "./hooks/useAuth";
import { ModalProvider } from "./hooks/useModal";
import { MatchProvider } from "./hooks/useMatch";
import { debugContextDevtool } from "react-context-devtool";

import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <MatchProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </MatchProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

debugContextDevtool(document.getElementById("root"));
