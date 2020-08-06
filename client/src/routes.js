import * as view from "./view/index";

const routes = [
  { exact: true, path: "/", name: "home", component: view.Home },
  { exact: true, path: "/champion/:name", name: "champion", component: view.Champion },
  { exact: false, path: "*", name: "", component: view.NotFound },
];

export default routes;
