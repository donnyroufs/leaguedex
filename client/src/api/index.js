/* Start abstracting every request into this file */
import makeRequest from "../helpers/makeRequest";

export class API {
  static endpoint = "/api";

  static async fetchMe() {
    return makeRequest(this.endpoint + "/user/me");
  }
}
