const mongoose = require("mongoose");

const schema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
});

const CHAT = mongoose.model("chat", schema);
module.exports = CHAT;
