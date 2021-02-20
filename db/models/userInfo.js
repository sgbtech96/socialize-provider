const mongoose = require("mongoose");
const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    default: null,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  tokens: {
    type: [String],
    default: [],
  },
  sockets: {
    type: [String],
    default: [],
  },
});
const USER = mongoose.model("User", schema);
module.exports = USER;
