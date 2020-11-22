require('dotenv/config');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { db, validateConnection } = require('./config/database');
const apiRoutes = require('./api/routes/index');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { handleError } = require('./helpers/error');
const csurf = require('csurf');
const corsOptions = require('./config/corsOptions');
const Riot = require('./lib/Riot');
const { CronJob } = require('cron');
const {
  cleanupVerifications,
  cleanupPasswordResets,
} = require('./lib/cleanups');

class Application {
  constructor() {
    this.PORT = process.env.PORT || 5000;
    this.inProduction = process.env.NODE_ENV === 'production';
    this.whitelist = ['https://staging.leaguedex.com', 'https://leaguedex.com'];
    this.userApiOptions = {
      windowMs: 15 * 60 * 1000,
      max: 10,
    };

    this.app = express();
    this.database = db;
    this.morgan = morgan;
    this.cookieParser = cookieParser;
    this.cors = cors;
    this.rateLimit = rateLimit;
    this.csurf = csurf;
    this.routes = apiRoutes;
    this.handleError = handleError;
    this.validateConnection = validateConnection;
    this.corsOptions = corsOptions(this.inProduction, this.whitelist);
    this.Riot = Riot;

    this.createCRONJobs();

    this.initialize = this.initialize.bind(this);
  }

  async initialize(callback) {
    this._setMiddleware();

    await this.validateConnection();

    this.app.listen(this.PORT, () =>
      console.log(`Server is listening on http://localhost:${this.PORT}`)
    );

    await callback(this);
  }

  _setMiddleware() {
    this.app.use(this.morgan(this.inProduction ? 'common' : 'dev'));
    this.app.use(this.cookieParser());
    this.app.use(express.json());

    // Csrf
    const csrfProtection = this.csurf({
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

    // Cors
    this.app.use(this.cors(this.corsOptions));

    // Rate Limiting
    this.app.set('trust proxy', 1);
    this.app.use('/api/user/login', this.rateLimit(this.userApiOptions));
    this.app.use('/api/user/register', this.rateLimit(this.userApiOptionsn));

    // Api
    this.app.use('/api', csrfProtection, this.routes);

    // Custom Error Handler
    this.app.use((err, req, res, next) => {
      this.handleError(err, res);
    });
  }

  createCRONJobs() {
    this.RiotAssetsJob = new CronJob('* * 2 * * *', () =>
      Riot.syncStaticData()
    );
    this.RemovePasswordResetsJob = new CronJob('0 0 0 * * *', () =>
      cleanupPasswordResets()
    );
    this.EmailVerificationsJob = new CronJob('0 0 0 * * *', () =>
      cleanupVerifications()
    );
  }
}

const app = new Application();

module.exports = app;
