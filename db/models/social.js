const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
});

const inviteSchema = mongoose.Schema({
  handle: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
    enum: ["sent", "received"],
  },
});

const socialSchema = mongoose.Schema({
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  friends: {
    type: [friendSchema],
    default: [],
  },
  invites: {
    type: [inviteSchema],
    default: [],
  },
});

const SOCIAL = mongoose.model("Social", socialSchema);
module.exports = SOCIAL;
