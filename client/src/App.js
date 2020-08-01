import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/layout/Layout";
import routes from "./routes";

const App = () => {
  useEffect(() => {
    fetch("/note")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

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
      </Switch>
    </Layout>
  );
};

export default App;
