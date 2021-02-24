const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  registered: {
    type: Boolean,
    default: false,
  },
});

const SIGN_UP = mongoose.model("SignUp", schema);
module.exports = SIGN_UP;
