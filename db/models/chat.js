const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  senderHandle: {
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
