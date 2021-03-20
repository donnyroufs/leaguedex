const Controller = require('./Controller');
const {
  ErrorHandler,
  NotFoundError,
  NotAuthorized,
  BadRequest,
} = require('../../helpers/error');
const { REFRESH_TOKEN } = require('../../helpers/constants');
const Riot = require('../../lib/Riot');
const Auth = require('../../lib/Auth');
const { sendEmail } = require('../../config/mail');
const {
  emailConfirmation,
  resetPassword: resetPasswordTemplate,
} = require('../../lib/mail.templates');
const { v4 } = require('uuid');
const { db } = require('../../config/database');
const { blackListEmail } = require('../../helpers/utils');

class UserController extends Controller {
  constructor(...props) {
    super(...props);

    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.destroy = this.destroy.bind(this);
    this.renew = this.renew.bind(this);
    this.refresh = this.refresh.bind(this);
    this.addSummmonerAccount = this.addSummmonerAccount.bind(this);
    this.getRegions = this.getRegions.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.sendResetPasswordEmail = this.sendResetPasswordEmail.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.me = this.me.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deleteSummoner = this.deleteSummoner.bind(this);
  }

  async all(_, res) {
    const data = await this.model.getDashboardData();
    const formattedData = this.formatters.all(data);
    res.status(200).json(formattedData);
  }

  async me(req, res) {
    const user = await this.model.me(req.user.id);

    if (!user) {
      throw new NotFoundError('User does not exist');
    }

    const formattedUser = this.formatters.me(user);

    res.status(200).json(formattedUser);
  }

  async sendResetPasswordEmail(req, res) {
    const { email } = req.query;

    const foundUser = await this.model.findByEmail(email);

    if (!foundUser) {
      throw new NotFoundError('No user found with the given email');
    }

    const token = v4();

    await db.user_reset_password.create({
      data: {
        token: token,
        user: {
          connect: {
            id: foundUser.id,
          },
        },
      },
    });

    await sendEmail(
      email,
      'Reset your password',
      resetPasswordTemplate(
        `https://leaguedex.com?action=reset_password&token=${token}`
      )
    );

    res.sendStatus(200);
  }

  async create(req, res) {
    const { username, password, email } = req.body;

    // TODO: fix email service
    // if (blackListEmail(email)) {
    //   throw new BadRequest('Current email domain is not supported');
    // }

    const hashedPassword = await Auth.hashPassword(password);

    await this.model.create({
      username,
      hashedPassword,
      email,
      active: true,
    });

    // TODO: Fix email service
    // const token = v4();
    // await this.model.createEmailToken(userId, token);

    // await sendEmail(
    //   email,
    //   'Confirm your email address',
    //   emailConfirmation(`https://leaguedex.com/verify/email?token=${token}`)
    // );

    res.sendStatus(201);
  }

  async login(req, res) {
    const { username, password } = req.body;

    const user = await this.model.findUser(username);

    if (!user) {
      throw new NotFoundError('username or password is not valid');
    }

    const validPassword = await Auth.isValidPassword(password, user.password);

    if (!validPassword) {
      throw new NotAuthorized('username or password is not valid');
    }

    // TODO: Fix email service
    // if (!user.active) {
    //   throw new NotAuthorized('Please verify your email.');
    // }

    const payload = {
      data: {
        id: user.id,
        username: user.username,
      },
    };

    const { token: accessToken } = await Auth.createToken(payload);

    const { token: refreshToken } = await Auth.createToken(
      payload,
      REFRESH_TOKEN
    );

    await Auth.createOrUpdateRefreshToken(user.id, refreshToken);

    Auth.setRefreshCookie(res, refreshToken);

    const { password: _, ...userData } = user;

    res.status(200).json({
      accessToken,
      ...userData,
    });
  }

  async destroy(req, res) {
    const { id: userId } = req.user;

    Auth.removeRefreshToken(userId);
    Auth.setRefreshCookie(res, null, 0);
    res.sendStatus(200);
  }

  async renew(req, res) {
    const payload = {
      data: req.user,
    };

    if (!req.user) {
      throw new NotAuthorized('You do not have a valid refresh token');
    }

    const user = await this.model.findById(req.user.id);

    const { token: refreshToken } = await Auth.createToken(
      payload,
      REFRESH_TOKEN
    );

    await Auth.createOrUpdateRefreshToken(req.user.id, refreshToken);

    Auth.setRefreshCookie(res, refreshToken);

    const { token: accessToken } = await Auth.createToken(payload);

    res.status(201).json({ accessToken, ...user });
  }

  async refresh(req, res) {
    const payload = {
      data: req.user,
    };

    const { token: accessToken } = await Auth.createToken(payload);

    res.status(201).json({ accessToken });
  }

  async addSummmonerAccount(req, res) {
    const { id: userId } = req.user;
    const { summonerName, region } = req.body;

    const data = await Riot.getSummoner(summonerName, region);

    if (!data) throw NotFoundError('could not find the summoner account.');

    await this.model.createSummoner(userId, {
      ...req.body,
      ...data,
    });

    const updateAccountPermissions = await this.model.updateAccountPermissions(
      userId
    );

    if (!updateAccountPermissions) {
      throw ErrorHandler(500, 'Could not update permissions.');
    }

    const updatedUser = await this.model.findById(userId);

    res.status(201).json(updatedUser);
  }

  getRegions(_, res) {
    const data = Riot.getRegions();
    res.status(200).json(data);
  }

  async verifyEmail(req, res) {
    const { token } = req.query;

    const { user_id: userId } = await this.model.getUserByToken(token);

    await this.model.removeVerificationToken(token);
    await this.model.updateOne(userId, {
      active: true,
    });

    res.sendStatus(204);
  }

  async changePassword(req, res) {
    const { password } = req.body;

    const hashedPassword = await Auth.hashPassword(password);
    await this.model.changePassword(req.user.id, hashedPassword);

    res.sendStatus(201);
  }

  async resetPassword(req, res) {
    const { token, password } = req.body;

    const foundUser = await db.user_reset_password.findOne({
      where: {
        token,
      },
    });

    if (!foundUser) {
      throw new NotFoundError('User does not seem to have a valid token');
    }

    const hashedPassword = await Auth.hashPassword(password);

    await this.model.changePassword(foundUser.user_id, hashedPassword);

    await db.user_reset_password.delete({
      where: {
        token,
      },
    });

    res.sendStatus(201);
  }

  async deleteSummoner(req, res) {
    const { summonerId } = req.query;
    const { id: userId } = req.user;

    if (!summonerId) {
      throw new NotFoundError('Missing summonerId');
    }

    await this.model.deleteSummoner(userId, summonerId);
    await this.model.updateAccountPermissions(userId, 1);

    const updatedUser = await this.model.findById(userId);

    res.status(201).json(updatedUser);
  }
}

module.exports = UserController;
