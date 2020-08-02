const mongoose = require("mongoose");

const championSchema = new mongoose.Schema({
  championId: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  lore: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Champion", championSchema);
