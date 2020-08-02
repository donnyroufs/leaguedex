class Application {
  constructor({ server, database, morgan, routes, helpers = {} } = {}) {
    this.express = server;
    this.app = this.express();
    this.database = database;
    this.morgan = morgan;
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
    this.app.use(this.express.json());
    this.app.use(this.morgan("tiny"));
    this.app.use("/api", this.routes.api);
    this.app.use((err, req, res, next) => {
      this.helpers.handleError(err, res);
    });
  }
}

module.exports = Application;
