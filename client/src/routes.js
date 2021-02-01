import * as pages from "./pages/index";

const routes = [
  {
    exact: true,
    path: "/",
    name: "home",
    component: pages.Home,
    permissions: 1,
  },
  {
    exact: true,
    path: "/matchups/:name",
    name: "matchups",
    component: pages.Matchups,
    permissions: 2,
  },
  {
    exact: true,
    path: "/match/:id",
    name: "match",
    component: pages.Match,
    permissions: 2,
  },
  {
    exact: true,
    path: "/dex/:id",
    name: "dex",
    component: pages.Dex,
    permissions: 2,
  },
  {
    exact: true,
    path: "/profile/:username",
    name: "profile",
    component: pages.Profile,
    permissions: 0,
  },
  {
    exact: true,
    path: "/profile/:username/matchups/:champion",
    name: "profile matchups",
    component: pages.ProfileMatchups,
    permissions: 0,
  },
  {
    exact: true,
    path: "/profile/:username/dex/:id",
    name: "shared dex",
    component: pages.SharedDex,
    permissions: 0,
  },
  {
    exact: true,
    path: "/admin/dashboard",
    name: "dashboard",
    component: pages.Dashboard,
    permissions: 10,
  },
  {
    exact: true,
    path: "/about",
    name: "about",
    component: pages.About,
    permissions: 1,
  },
  {
    exact: true,
    path: "/verify/email",
    name: "verify",
    component: pages.Verify,
    permissions: 1,
  },
  {
    exact: true,
    path: "/settings",
    name: "verify",
    component: pages.Settings,
    permissions: 1,
  },
  {
    exact: false,
    path: "*",
    name: "",
    component: pages.NotFound,
    permissions: 1,
  },
];

export default routes;
