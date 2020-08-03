const Controller = require("./Controller");
const { ErrorHandler } = require("../../helpers/error");

class UserController extends Controller {
  constructor(props) {
    super(props);
    this.auth = props.auth;

    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.destroy = this.destroy.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async create(req, res, next) {
    const token = this.auth.createToken({
      data: {
        username: "test",
      },
    });
    res.json(token);
  }

  async login(req, res, next) {
    const { token } = req.query;

    try {
      await this.auth.verifyToken(token);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  async destroy(req, res, next) {}
  async refresh(req, res, next) {}
}

module.exports = UserController;
