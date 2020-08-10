require("dotenv/config");

const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const { db, validateConnection } = require("./config/database");
const apiRoutes = require("./api/routes/index");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { handleError } = require("./helpers/error");

const Application = require("./Application");
const Riot = require("./lib/Riot");

const app = new Application({
  server: express,
  database: db,
  middleware: {
    morgan,
    cookieParser,
    cors,
    rateLimit,
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
    Riot.syncChampions();
  });
})();

module.exports = app;
