import React from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/layout/Layout";
import routes, { NotFound } from "./routes";

const App = () => {
  return (
    <Layout>
      <Switch>
        {routes.map((route) => (
          <Route
            exact
            path={route.path}
            component={route.component}
            key={route.path}
          />
        ))}
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;
