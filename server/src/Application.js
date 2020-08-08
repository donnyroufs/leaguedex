class Application {
  static userApi = {
    windowMs: 15 * 60 * 1000,
    max: 10,
  };

  constructor({ server, database, middleware, routes, helpers = {} } = {}) {
    this.express = server;
    this.app = this.express();
    this.database = database;
    this.middleware = middleware;
    this.routes = routes;
    this.helpers = helpers;
  }

  async initialize(callback) {
    this._setMiddleware();

    await this.helpers.validateConnection();

    this.app.listen(process.env.PORT, () =>
      console.log(`Server is listening on http://localhost:${process.env.PORT}`)
    );
    callback(this.app);
  }

  _setMiddleware() {
    this.app.use("/api/user", this.middleware.rateLimit(this.userApi));
    this.app.use(this.middleware.cookieParser());
    this.app.use(this.express.json());
    this.app.use(this.middleware.morgan("tiny"));
    this.app.use(this.middleware.cors());
    this.app.use("/api", this.routes.api);
    this.app.use((err, req, res, next) => {
      this.helpers.handleError(err, res);
    });
  }
}

module.exports = Application;
