const Controller = require("./Controller");
const { ErrorHandler } = require("../../helpers/error");
const { REFRESH_TOKEN } = require("../../helpers/constants");
const Riot = require("../../lib/Riot");
const { db } = require("../../config/database");

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

  async create(req, res, next) {
    const { username, password, password_confirmation, email } = req.body;
    // validate fields (username, email, password, password_confirmation)

    try {
      const hashedPassword = await this.Auth.hashPassword(password);
      const newUser = await this.model.create({
        data: {
          username,
          password: hashedPassword,
          email,
        },
        select: {
          username: true,
        },
      });

      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    // validate fields (username, password)
    // Check if username exists
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
        },
      });

      // Should change error message
      if (!user) throw new ErrorHandler(404, "User does not exist");

      // Check if password valid
      const validPassword = await this.Auth.isValidPassword(
        password,
        user.password
      );

      if (!validPassword) {
        throw new ErrorHandler(403, "Username or password is not valid.");
      }

      // grant refresh and access token.
      const payload = {
        data: {
          id: user.id,
          username: user.username,
          summoner: user.summoner,
        },
      };

      const {
        token: accessToken,
        expirationDate,
      } = await this.Auth.createToken(payload);
      const { token: refreshToken } = await this.Auth.createToken(
        payload,
        REFRESH_TOKEN
      );

      // store refreshtoken in database
      await this.Auth.createOrUpdateRefreshToken(user.username, refreshToken);

      // set authorization bearer for access token
      this.Auth.setBearer(res, accessToken);

      // set cookie for refresh token
      this.Auth.setRefreshCookie(res, refreshToken);

      res.status(200).json({
        username: user.username,
        summoner: user.summoner,
        token: accessToken,
        expirationDate,
      });
    } catch (err) {
      next(err);
    }
  }

  async destroy(req, res, next) {
    const username = req.user.username;

    try {
      this.Auth.removeRefreshToken(username);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const payload = {
        data: {
          id: req.user.id,
          username: req.user.username,
          summoner: req.user.summoner,
        },
      };

      // Quick dirty fix.
      if (!req.user.summoner) {
        const _data = await this.model.findOne({
          where: {
            id: req.user.id,
          },
          select: {
            summoner: true,
          },
        });
        payload.data.summoner = _data.summoner;
      }

      const {
        token: accessToken,
        expirationDate,
      } = await this.Auth.createToken(payload);
      this.Auth.setBearer(res, accessToken);

      res.status(200).json({
        username: payload.data.username,
        summoner: payload.data.summoner,
        token: accessToken,
        expirationDate,
      });
    } catch (err) {
      next(err);
    }
  }

  async addSummmonerAccount(req, res, next) {
    const { summonerName } = req.body;
    try {
      const data = await Riot.getSummoner(summonerName);

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

      // Should update token here

      res.status(201).json(addedSummoner);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
