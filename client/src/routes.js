import * as view from "./view/index";

const routes = [
  {
    exact: true,
    path: "/",
    name: "home",
    component: view.Home,
    permissions: 1,
  },
  {
    exact: true,
    path: "/admin/dashboard",
    name: "dashboard",
    component: view.Dashboard,
    permissions: 2,
  },
  {
    exact: false,
    path: "*",
    name: "",
    component: view.NotFound,
    permissions: 1,
  },
];

export default routes;
