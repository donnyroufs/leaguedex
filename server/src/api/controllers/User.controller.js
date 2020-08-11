const Controller = require('./Controller');
const { ErrorHandler } = require('../../helpers/error');
const { REFRESH_TOKEN } = require('../../helpers/constants');
const Riot = require('../../lib/Riot');
const { db } = require('../../config/database');

class UserController extends Controller {
  constructor({ model, auth }) {
    super(model);
    this.Auth = auth;

    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.destroy = this.destroy.bind(this);
    this.refresh = this.refresh.bind(this);
    this.addSummmonerAccount = this.addSummmonerAccount.bind(this);
  }

  async all(req, res) {
    const data = await this.model.findMany({
      select: {
        username: true,
        summoner: {
          select: {
            name: true,
            level: true,
            region: true,
          },
        },
        email: true,
        createdAt: true,
      },
    });

    const formattedData = data.map((user) => ({
      username: user.username,
      summonerName: user.summoner ? user.summoner.name : '-',
      email: user.email,
      region: user.summoner ? user.summoner.region : '-',
      createdAt: new Date(user.createdAt).toISOString().substr(0, 10),
    }));

    res.status(200).json(formattedData);
  }

  async create(req, res, next) {
    const { username, password, email } = req.body;

    try {
      const hashedPassword = await this.Auth.hashPassword(password);
      await this.model.create({
        data: {
          username,
          password: hashedPassword,
          email,
        },
      });

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await this.model.findOne({
        where: {
          username,
        },
        select: {
          id: true,
          username: true,
          password: true,
          summoner: true,
          permissions: true,
        },
      });

      if (!user) throw new ErrorHandler(403, 'User or password is not valid.');

      const validPassword = await this.Auth.isValidPassword(
        password,
        user.password
      );

      if (!validPassword) {
        throw new ErrorHandler(403, 'Username or password is not valid.');
      }

      const payload = {
        data: {
          id: user.id,
          username: user.username,
          summoner: user.summoner,
          permissions: user.permissions,
        },
      };

      const { token: accessToken } = await this.Auth.createToken(payload);

      const { token: refreshToken } = await this.Auth.createToken(
        payload,
        REFRESH_TOKEN
      );

      await this.Auth.createOrUpdateRefreshToken(user.username, refreshToken);

      this.Auth.setRefreshCookie(res, refreshToken);

      res.status(200).json({
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  async destroy(req, res, next) {
    const username = req.user.username;

    try {
      this.Auth.removeRefreshToken(username);
      this.Auth.setRefreshCookie(res, null, 0);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const payload = {
        data: req.user,
      };

      const { token: refreshToken } = await this.Auth.createToken(
        payload,
        REFRESH_TOKEN
      );

      await this.Auth.createOrUpdateRefreshToken(
        req.user.username,
        refreshToken
      );

      this.Auth.setRefreshCookie(res, refreshToken);

      const { token: accessToken } = await this.Auth.createToken(payload);

      res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }

  async addSummmonerAccount(req, res, next) {
    const { summonerName } = req.body;

    try {
      const data = await Riot.getSummoner(summonerName);

      if (!data) throw ErrorHandler(500, "Couldn't make the request.");

      const addedSummoner = await db.summoner.create({
        data: {
          accountId: data.accountId,
          name: data.name,
          level: data.summonerLevel,
          user: {
            connect: {
              id: Number(req.user.id),
            },
          },
        },
      });

      const updateAccountPermissions = await this.model.update({
        where: {
          id: Number(req.user.id),
        },
        data: {
          permissions: 2,
        },
      });

      if (!updateAccountPermissions)
        throw ErrorHandler(500, 'Could not update permissions.');

      const payload = {
        data: {
          ...req.user,
          summoner: addedSummoner,
          permissions: 2,
        },
      };

      const { token: refreshToken } = await this.Auth.createToken(
        payload,
        REFRESH_TOKEN
      );

      await this.Auth.createOrUpdateRefreshToken(
        req.user.username,
        refreshToken
      );

      this.Auth.setRefreshCookie(res, refreshToken);

      const { token: accessToken } = await this.Auth.createToken(payload);

      res.status(201).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
