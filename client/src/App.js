import React, { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import Layout from "./components/layout/Layout";
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import SummonerModal from "./components/modal/SummonerModal";
import routes from "./routes";
import { useAuth } from "./hooks/useAuth";
import { useModal } from "./hooks/useModal";
import { useMatch } from "./hooks/useMatch";
import makeRequest from "./helpers/makeRequest";

async function syncData() {
  const res = await makeRequest("/api/matchup/sync");
  return res.json();
}

const App = () => {
  const {
    renewAuth,
    user,
    loading,
    initialLoad,
    setInitialLoad,
    isAllowed,
  } = useAuth();
  const { setModal } = useModal();
  const { findMatch, hasMatch } = useMatch();

  useEffect(() => {
    renewAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && !user.summoner && initialLoad) {
      setModal("summoner");
      setInitialLoad(false);
    }

    if (user && !hasMatch && initialLoad) {
      syncData();
      findMatch();
      setInitialLoad(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <Layout>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <LoginModal />
      <RegisterModal />
      <SummonerModal />
      {!loading && (
        <Switch>
          {routes.map((route) =>
            !route.permissions || route.permissions === 1 ? (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={route.path}
              />
            ) : (
              <ProtectedRoute
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={route.path}
                isAllowed={isAllowed(route.permissions)}
              />
            )
          )}
        </Switch>
      )}
    </Layout>
  );
};

export default App;
