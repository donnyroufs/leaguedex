const Controller = require("./Controller");
const { ErrorHandler } = require("../../helpers/error");
const { REFRESH_TOKEN } = require("../../helpers/constants");

class UserController extends Controller {
  constructor({ model, auth }) {
    super(model);
    this.Auth = auth;

    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.destroy = this.destroy.bind(this);
    this.refresh = this.refresh.bind(this);
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
          username: true,
          password: true,
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
          username: user.username,
        },
      };

      const accessToken = await this.Auth.createToken(payload);
      const refreshToken = await this.Auth.createToken(payload, REFRESH_TOKEN);

      // store refreshtoken in database
      await this.Auth.createOrUpdateRefreshToken(user.username, refreshToken);

      // set authorization bearer for access token
      this.Auth.setBearer(res, accessToken);

      // set cookie for refresh token
      this.Auth.setRefreshCookie(res, refreshToken);

      res.status(200).json({
        username: user.username,
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
          username: req.user.username,
        },
      };

      const accessToken = await this.Auth.createToken(payload);
      this.Auth.setBearer(res, accessToken);

      res.status(200).json({
        username: req.user.username,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
