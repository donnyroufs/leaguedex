import { getToken } from "./getToken";

async function makeRequest(endpoint, { headers, ...options } = {}) {
  return fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getToken(),
      ...headers,
    },
    credentials: "include",
    ...options,
  });
}

export default makeRequest;
