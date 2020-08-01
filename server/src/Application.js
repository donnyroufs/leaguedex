class Application {
  constructor({ server, database, morgan, routes, handleError }) {
    this.express = server;
    this.app = this.express();
    this.database = database;
    this.morgan = morgan;
    this.routes = routes;
    this.handleError = handleError;
  }

  initialize() {
    this._setMiddleware();

    this.database.on("error", console.error.bind(console, "connection error:"));
    this.database.once("open", () => console.log("connected to database..."));

    this.app.listen(process.env.PORT, () =>
      console.log(`Server is listening on http://localhost:${process.env.PORT}`)
    );
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
