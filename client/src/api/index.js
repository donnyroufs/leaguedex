/* Start abstracting every request into this file */
import makeRequest from "../helpers/makeRequest";

export class API {
  static endpoint = "/api";

  static async fetchMe() {
    return makeRequest(this.endpoint + "/user/me");
  }

  static async changePassword(password, password_confirmation) {
    return makeRequest(this.endpoint + "/user/change_password", {
      method: "PATCH",
      body: JSON.stringify({
        password,
        password_confirmation,
      }),
    });
  }
}
