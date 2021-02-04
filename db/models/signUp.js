const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  attempts: {
    type: Number,
    required: true,
  },
});

const SIGN_UP = mongoose.model("sign_up", schema);
module.exports = SIGN_UP;
