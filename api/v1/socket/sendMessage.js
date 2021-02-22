const { CHAT } = require("../../../db/models");
module.exports = (io, socket) => async (channelId, text) => {
  const { handle: myHandle } = socket;
  const message = {
    sender: myHandle,
    text,
    timeStamp: Date.now(),
  };
  try {
    io.to(channelId).emit("INCOMING_MESSAGE", message);
    CHAT.findOneAndUpdate(
      { channelId },
      {
        $push: {
          chats: message,
        },
      }
    );
  } catch (e) {}
};
