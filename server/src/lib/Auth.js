const { ACCESS_TOKEN, REFRESH_TOKEN } = require("../helpers/constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { handleError, ErrorHandler } = require("../helpers/error");
const { db } = require("../config/database");

class Auth {
  static options = {
    [ACCESS_TOKEN]: {
      expiresIn: "15s",
    },
    [REFRESH_TOKEN]: {
      expiresIn: "7d",
    },
  };

  static HASH_ROUNDS = 10;

  static authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) throw new ErrorHandler(401, "Missing token.");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) throw new ErrorHandler(403, "invalid token.");
      req.user = data.data;
      next();
    });
  }

  static async validateRefreshToken(req, res, next) {
    const refreshToken = req.cookies["x-refresh-token"];
    const decoded = jwt.decode(refreshToken);

    try {
      const data = await db.authentication.findOne({
        where: {
          username: decoded.data.username,
        },
      });

      if (!data) throw new ErrorHandler(404, "Could not find token.");

      jwt.verify(data.token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) throw new ErrorHandler(403, "invalid token.");
        req.user = data.data;
        next();
      });
    } catch (err) {
      next(err);
    }
  }

  static async removeRefreshToken(username) {
    return db.authentication.delete({
      where: {
        username,
      },
    });
  }

  static async isValidPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, this.HASH_ROUNDS);
  }

  static async createToken(payload, type = ACCESS_TOKEN) {
    return jwt.sign(payload, process.env[`${type}_SECRET`], this.options[type]);
  }

  static async verifyToken(accessToken, refreshToken, next) {
    return !!jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }

  static async createOrUpdateRefreshToken(username, refreshToken) {
    return db.authentication.upsert({
      where: {
        username,
      },
      create: {
        username,
        token: refreshToken,
      },
      update: {
        token: refreshToken,
      },
    });
  }

  static setBearer(res, accessToken) {
    res.header("Authorization", "Bearer " + accessToken);
  }

  static async setRefreshCookie(res, refreshToken) {
    const SEVEN_DAYS = 10080;
    const expiration = this.setExpirationDate(SEVEN_DAYS);
    const options = {
      httpOnly: true,
      expires: expiration,
      promo_shown: 1,
      sameSite: "Lax",
    };

    res.cookie("x-refresh-token", refreshToken, options);
  }

  static setExpirationDate = (expires) => {
    const minute = 60000;
    const current_date = new Date().getTime();
    return new Date(current_date + expires * (minute * 1));
  };
}

module.exports = Auth;
