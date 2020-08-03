import * as view from "./view/index";

const routes = [
  { exact: true, path: "/", name: "home", component: view.Home },
  { exact: false, path: "*", name: "", component: view.NotFound },
];

export default routes;
