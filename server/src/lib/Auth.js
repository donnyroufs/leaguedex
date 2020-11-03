const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../helpers/constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ErrorHandler, NotAuthorized } = require('../helpers/error');
const { db } = require('../config/database');
const app = require('../Application');

class Auth {
  static options = {
    [ACCESS_TOKEN]: {
      expiresIn: '3m',
    },
    [REFRESH_TOKEN]: {
      expiresIn: '7d',
    },
  };

  static HASH_ROUNDS = 10;

  static isAdmin(req, _, next) {
    if (req.user.permissions >= 10) {
      return next();
    } else {
      throw new NotAuthorized();
    }
  }

  static authenticateToken(req, _, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) throw new ErrorHandler(403, 'Not allowed.');

    const valid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!valid) throw ErrorHandler(403, 'Not allowed.');

    const { data: decoded } = jwt.decode(token);

    req.user = decoded;
    next();
  }

  static async validateRefreshToken(req, _, next) {
    const refreshToken = req.cookies['x-refresh-token'];

    if (!refreshToken) return next();

    try {
      const valid = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      if (!valid) return new ErrorHandler(403, 'Not allowed.');

      const { data: decoded } = jwt.decode(refreshToken);
      const data = await db.token.findOne({
        where: {
          user_id: decoded.id,
        },
      });

      if (!data) throw new ErrorHandler(404, 'Could not find token.');

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  }

  static async removeRefreshToken(userId) {
    return db.token.delete({
      where: {
        user_id: userId,
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
    const token = jwt.sign(
      payload,
      process.env[`${type}_SECRET`],
      this.options[type]
    );
    const { exp: expirationDate } = jwt.decode(token);
    return { token, expirationDate };
  }

  static async createOrUpdateRefreshToken(userId, refreshToken) {
    return db.token.upsert({
      where: {
        user_id: userId,
      },
      create: {
        token: refreshToken,
        user: {
          connect: { id: userId },
        },
      },
      update: {
        token: refreshToken,
      },
    });
  }

  static setBearer(res, accessToken) {
    res.header('Authorization', 'Bearer ' + accessToken);
  }

  static async setRefreshCookie(res, refreshToken, exp = 10080) {
    const expiration = this.setExpirationDate(exp);
    const options = {
      httpOnly: app.inProduction,
      expires: expiration,
      promo_shown: 1,
      sameSite: true,
      secure: app.inProduction,
    };

    res.cookie('x-refresh-token', refreshToken, options);
  }

  static setExpirationDate = (expires) => {
    const minute = 60000;
    const current_date = new Date().getTime();
    return new Date(current_date + expires * (minute * 1));
  };
}

module.exports = Auth;
