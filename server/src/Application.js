class Application {
  constructor({ server, database, middleware, routes, helpers = {} } = {}) {
    this.express = server;
    this.app = this.express();
    this.database = database;
    this.middleware = middleware;
    this.routes = routes;
    this.helpers = helpers;

    this._setMiddleware = this._setMiddleware.bind(this);
  }

  async initialize(callback) {
    this.inProduction = process.env.NODE_ENV === 'production';
    this.userApi = {
      windowMs: 15 * 60 * 1000,
      max: 10,
    };
    this._setMiddleware();

    await this.helpers.validateConnection();

    this.app.listen(process.env.PORT, () =>
      console.log(`Server is listening on http://localhost:${process.env.PORT}`)
    );
    callback(this.app);
  }

  _setMiddleware() {
    const whitelist = [
      'https://staging.leaguedex.com',
      'https://leaguedex.com',
    ];
    const corsOptions = this.inProduction
      ? {
          origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          },
          credentials: true,
        }
      : {
          credentials: true,
        };

    this.app.use(this.middleware.cookieParser());
    const csrfProtection = this.middleware.csurf({
      cookie: {
        httpOnly: true,
        secure: this.inProduction,
      },
    });

    this.app.use(csrfProtection, (req, res, next) => {
      const csrfToken = req.csrfToken();
      res.cookie('csrf-token', csrfToken);
      next();
    });

    // this.app.use('/api/user/login', this.middleware.rateLimit(this.userApi));
    // this.app.use('/api/user/register', this.middleware.rateLimit(this.userApi));
    this.app.use(this.express.json());
    this.app.use(this.middleware.morgan('tiny'));
    this.app.use(this.middleware.cors(corsOptions));
    this.app.use('/api', csrfProtection, this.routes.api);
    this.app.use((err, req, res, next) => {
      this.helpers.handleError(err, res);
    });
  }
}

module.exports = Application;
