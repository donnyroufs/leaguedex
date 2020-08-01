require("dotenv/config");

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const { handleError, ErrorHandler } = require("./helpers/error");
const apiRoutes = require("./api/routes/index");

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected to database..."));

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
);
