import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import Layout from "./components/layout/Layout";
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import SummonerModal from "./components/modal/SummonerModal";
import ForgotPasswordModal from "./components/modal/ForgotPasswordModal";
import ResetPasswordModal from "./components/modal/ResetPasswordModal";
import routes from "./routes";
import { useInitialPageLoad } from "./hooks/useInitialPageLoad";

const App = () => {
  const { loading, isAllowed } = useInitialPageLoad();

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
      <ResetPasswordModal />
      <ForgotPasswordModal />
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
