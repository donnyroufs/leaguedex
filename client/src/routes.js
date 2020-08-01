import * as view from "./view/index";

const routes = [{ exact: true, path: "/", name: "home", component: view.Home }];

export const NotFound = view.NotFound;

export default routes;
