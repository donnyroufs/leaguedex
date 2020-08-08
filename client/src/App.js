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
import * as Loader from "./components/styles/Loader";
import { MoonLoader } from "react-spinners";

const App = () => {
  const {
    refreshToken,
    user,
    loading,
    initialLoad,
    setInitialLoad,
    isAllowed,
  } = useAuth();
  const { setModal } = useModal();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && !user.summoner && initialLoad) {
      setModal("summoner");
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Loader.Container hide={!loading && "true"}>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
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
