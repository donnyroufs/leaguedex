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
    path: "/champion/:name",
    name: "champion",
    component: view.Champion,
    permissions: 2,
  },
  {
    exact: true,
    path: "/match/:id",
    name: "match",
    component: view.Match,
    permissions: 2,
  },
  {
    exact: true,
    path: "/dex/:id",
    name: "dex",
    component: view.Dex,
    permissions: 2,
  },
  {
    exact: true,
    path: "/shared/:username",
    name: "shared",
    component: view.Shared,
    permissions: 0,
  },
  {
    exact: true,
    path: "/shared/:username/:id",
    name: "shared",
    component: view.SharedDex,
    permissions: 0,
  },
  {
    exact: true,
    path: "/admin/dashboard",
    name: "dashboard",
    component: view.Dashboard,
    permissions: 10,
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
