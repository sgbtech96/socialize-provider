const chalk = require("chalk");
const { CHAT } = require("../../../db/models");
module.exports = (io, socket) => async (channelId, text) => {
  const { handle: myHandle } = socket;
  // console.log(`${myHandle} sent ${text}`);
  const message = {
    senderHandle: myHandle,
    text,
    timeStamp: Date.now(),
  };
  try {
    io.in(channelId).emit("INCOMING_MESSAGE", { message, channelId });
    CHAT.findOneAndUpdate(
      { channelId },
      {
        $push: {
          chats: message,
        },
      }
    ).exec();
  } catch (e) {
    // console.log(chalk.redBright(e));
  }
};
