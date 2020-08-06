import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import Layout from "./components/layout/Layout";
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import routes from "./routes";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { refreshToken } = useAuth();

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Switch>
        {routes.map((route) => (
          <Route
            exact={route.exact}
            path={route.path}
            component={route.component}
            key={route.path}
          />
        ))}
      </Switch>
    </Layout>
  );
};

export default App;
