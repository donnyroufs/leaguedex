const Controller = require('./Controller');
const {
  ErrorHandler,
  NotFoundError,
  NotAuthorized,
} = require('../../helpers/error');
const { REFRESH_TOKEN } = require('../../helpers/constants');
const Riot = require('../../lib/Riot');
const Auth = require('../../lib/Auth');
const { sendEmail } = require('../../config/mail');
const { emailConfirmation } = require('../../lib/mail.templates');
const { v4 } = require('uuid');

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
  }

  async all(_, res) {
    const data = await this.model.getDashboardData();
    const formattedData = this.formatters.all(data);
    res.status(200).json(formattedData);
  }

  async create(req, res) {
    const { username, password, email } = req.body;

    const hashedPassword = await Auth.hashPassword(password);
    const userId = await this.model.create({
      username,
      hashedPassword,
      email,
    });

    const token = v4();
    await this.model.createEmailToken(userId, token);

    await sendEmail(
      email,
      'Confirm your email address',
      emailConfirmation(`https://leaguedex.com/verify/email?token=${token}`)
    );

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

    if (!user.active) {
      throw new NotAuthorized('Your e-mail is not verified');
    }

    const payload = {
      data: {
        id: user.id,
        username: user.username,
        summoner: user.summoner,
        active: user.active,
        permissions: user.permissions,
      },
    };

    const { token: accessToken } = await Auth.createToken(payload);

    const { token: refreshToken } = await Auth.createToken(
      payload,
      REFRESH_TOKEN
    );

    await Auth.createOrUpdateRefreshToken(user.id, refreshToken);

    Auth.setRefreshCookie(res, refreshToken);

    res.status(200).json({
      accessToken,
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

    const { token: refreshToken } = await Auth.createToken(
      payload,
      REFRESH_TOKEN
    );

    await Auth.createOrUpdateRefreshToken(req.user.id, refreshToken);

    Auth.setRefreshCookie(res, refreshToken);

    const { token: accessToken } = await Auth.createToken(payload);

    res.status(201).json({ accessToken });
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

    const addedSummoner = await this.model.createSummoner(userId, {
      ...req.body,
      ...data,
    });

    const updateAccountPermissions = await this.model.updateAccountPermissions(
      userId
    );

    if (!updateAccountPermissions) {
      throw ErrorHandler(500, 'Could not update permissions.');
    }

    const payload = {
      data: {
        ...req.user,
        summoner: addedSummoner,
        permissions: 2,
      },
    };

    const { token: refreshToken } = await Auth.createToken(
      payload,
      REFRESH_TOKEN
    );

    await Auth.createOrUpdateRefreshToken(req.user.id, refreshToken);

    Auth.setRefreshCookie(res, refreshToken);

    const { token: accessToken } = await Auth.createToken(payload);

    res.status(201).json({ accessToken });
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
}

module.exports = UserController;
