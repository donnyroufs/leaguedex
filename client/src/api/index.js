/* Start abstracting every request into this file */
import makeRequest from "../helpers/makeRequest";

export class API {
  static endpoint = "/api";

  static async updateMatchNotifications(payload, summonerId) {
    return makeRequest(this.endpoint + `/game?summonerId=${summonerId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async getMatchNotifications(id, accountId) {
    return makeRequest(this.endpoint + `/game?accountId=${accountId}&id=${id}`);
  }

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

  static async deleteSummoner(summonerId) {
    return makeRequest(
      this.endpoint + `/user/summoner?summonerId=${summonerId}`,
      {
        method: "DELETE",
      }
    );
  }

  static async fetchLogin(formData) {
    const response = await makeRequest(this.endpoint + `/user/login`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return response.json();
  }

  static async fetchRegister(formData) {
    const response = await makeRequest(this.endpoint + `/user/register`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return response.status === 201;
  }

  static async fetchLogout() {
    return makeRequest(this.endpoint + `/user/logout`, {
      method: "DELETE",
    });
  }

  static async renew() {
    const response = await makeRequest(this.endpoint + "/user/renew");
    return response.json();
  }

  static async refresh() {
    const response = await makeRequest(this.endpoint + `/user/refresh`);
    return response.json();
  }

  static async syncData(summonerId) {
    const res = await makeRequest(
      this.endpoint + `/matchup/sync?summonerId=${summonerId}`
    );
    return res.json();
  }

  static async fetchFindMatch(activeSummonerId) {
    return makeRequest(`/api/matchup/find?summonerId=${activeSummonerId}`);
  }

  static async fetchLatest(id, summonerId) {
    const res = await makeRequest(
      `/api/matchup/latest/${id}?summonerId=${summonerId}`
    );
    return res.json();
  }
}
