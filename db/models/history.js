const mongoose = require("mongoose");

const schema = mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  chats: {
    type: Array,
    required: true,
  },
});

const HISTORY = mongoose.model("history", schema);
module.exports = HISTORY;
