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
import { StatusProvider } from "./hooks/useStatus";
import { ChampionsProvider } from "./hooks/useChampions";
import { debugContextDevtool } from "react-context-devtool";

import "react-toastify/dist/ReactToastify.css";
import { SidebarProvider } from "./hooks/useSidebar";
import { NotificationsProvider } from "./hooks/useNotifications";

// import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn:
//     "https://59d43b51a7914740bd7c751a2089140b@o510434.ingest.sentry.io/5606640",
// });

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <MatchProvider>
            <ModalProvider>
              <StatusProvider>
                <SidebarProvider>
                  <ChampionsProvider>
                    <NotificationsProvider>
                      <App />
                    </NotificationsProvider>
                  </ChampionsProvider>
                </SidebarProvider>
              </StatusProvider>
            </ModalProvider>
          </MatchProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "debug") {
  debugContextDevtool(document.getElementById("root"));
}
