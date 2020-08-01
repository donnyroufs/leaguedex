const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Note", noteSchema);
