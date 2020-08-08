import * as view from "./view/index";

const routes = [
  {
    exact: true,
    path: "/",
    name: "home",
    component: view.Home,
    protected: false,
  },
  {
    exact: true,
    path: "/admin/dashboard",
    name: "dashboard",
    component: view.Dashboard,
    protected: true,
  },
  {
    exact: false,
    path: "*",
    name: "",
    component: view.NotFound,
    protected: false,
  },
];

export default routes;
