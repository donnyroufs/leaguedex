const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
