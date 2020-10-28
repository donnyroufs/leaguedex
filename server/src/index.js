const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env') });

const express = require('express');
const rateLimit = require('express-rate-limit');
const { db, validateConnection } = require('./config/database');
const apiRoutes = require('./api/routes/index');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { handleError } = require('./helpers/error');
const csurf = require('csurf');
const { CronJob } = require('cron');
const { cleanupVerifications } = require('./lib/EmailVerification');

const Application = require('./Application');
const Riot = require('./lib/Riot');

const RiotAssetsJob = new CronJob('* * 2 * * *', () => Riot.syncStaticData());
const EmailVerificationsJob = new CronJob('0 0 0 * * *', () =>
  cleanupVerifications()
);

const app = new Application({
  server: express,
  database: db,
  middleware: {
    morgan,
    cookieParser,
    cors,
    rateLimit,
    csurf,
  },
  routes: {
    api: apiRoutes,
  },
  helpers: {
    handleError,
    validateConnection,
  },
});

(async () => {
  await app.initialize(async (app) => {
    // On restart sync data
    Riot.syncStaticData();

    // Then every other hour check if our data is still up to date.
    RiotAssetsJob.start();

    // Run CRON job for user email verification 00:00
    EmailVerificationsJob.start();
  });
})();

module.exports = app;
