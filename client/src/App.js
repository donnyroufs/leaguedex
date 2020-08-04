import React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/layout/Layout";
import LoginModal from "./components/modal/LoginModal";
import routes from "./routes";

const App = () => {
  return (
    <Layout>
      <LoginModal />
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
