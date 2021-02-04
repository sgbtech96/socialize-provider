//users model, will record each registered user, and keeps track of their login sessions
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  tokens: {
    type: Array,
    required: true,
  },
});
const USER = mongoose.model("user", schema);
module.exports = USER;
