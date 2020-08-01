require("dotenv/config");

const express = require("express");
const morgan = require("morgan");
const app = express();

const { handleError } = require("./helpers/error");
const apiRoutes = require("./api/routes/index");
const db = require("./config/database");

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  handleError(err, res);
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected to database..."));

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);
