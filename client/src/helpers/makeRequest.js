import Cookies from "js-cookie";
import { getToken } from "./getToken";

async function makeRequest(endpoint, { headers, ...options } = {}) {
  return fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
      "x-csrf-token": Cookies.get("csrf-token"),
      ...headers,
    },
    credentials: "same-origin",
    ...options,
  });
}

export default makeRequest;
