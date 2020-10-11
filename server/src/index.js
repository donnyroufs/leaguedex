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

const Application = require('./Application');
const Riot = require('./lib/Riot');

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
  await app.initialize((app) => {
    Riot.syncStaticData();
  });
})();

module.exports = app;
