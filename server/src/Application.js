class Application {
  constructor({
    server,
    database,
    morgan,
    routes,
    handleError,
    validateConnection,
  }) {
    this.express = server;
    this.app = this.express();
    this.database = database;
    this.morgan = morgan;
    this.routes = routes;
    this.handleError = handleError;
    this.validateConnection = validateConnection;
  }

  async initialize(callback) {
    this._setMiddleware();

    await this.validateConnection();

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
      this.handleError(err, res);
    });
  }
}

module.exports = Application;
