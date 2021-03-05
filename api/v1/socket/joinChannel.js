const chalk = require("chalk");
const { CHAT } = require("../../../db/models");
module.exports = (io, socket) => async (channelId) => {
  const { handle: myHandle } = socket;
  // console.log(`${myHandle} joined ${channelId}!`);
  try {
    const record = await CHAT.findOne({ channelId }).select("members -_id");
    const { members } = record;
    if (members.includes(myHandle)) socket.join(channelId);
  } catch (e) {
    // console.log(chalk.redBright(e));
  }
};
