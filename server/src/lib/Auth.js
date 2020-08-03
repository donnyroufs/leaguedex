const { ACCESS_TOKEN, REFRESH_TOKEN } = require("../helpers/constants");
const jwt = require("jsonwebtoken");

class Auth {
  static options = {
    [ACCESS_TOKEN]: {
      expiresIn: "5m",
    },
    [REFRESH_TOKEN]: {
      expiresIn: "7d",
    },
  };

  static createToken(payload, type = ACCESS_TOKEN) {
    return jwt.sign(payload, process.env[`${type}_SECRET`], this.options[type]);
  }

  static async verifyToken(accessToken, refreshToken, next) {
    return !!jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }

  static async createCookie() {}

  _setExpirationDate = (expires) => {
    const minute = 60000;
    const current_date = new Date().getTime();
    return new Date(current_date + expires * (minute * 1));
  };
}

module.exports = Auth;
