const mongoose = require("mongoose");
const shortid = require("shortid");

const messageSchema = mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const arrayLimit = (val) => {
  return val.length == 2;
};
const chatSchema = mongoose.Schema({
  channelId: {
    type: String,
    default: shortid.generate(),
    unique: true,
  },
  members: {
    type: [String],
    required: 2,
    validate: [arrayLimit, "Only 2 people allowed in a channel!"],
  },
  chats: {
    type: [messageSchema],
    default: [],
  },
});

const CHAT = mongoose.model("Chat", chatSchema);
module.exports = CHAT;
