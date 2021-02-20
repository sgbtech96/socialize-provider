const socketAuth = require("../../../middleware/socketAuth");

const { CHAT } = require("../../../db/models");
module.exports = (io, socket) => async (channelId) => {
  const { handle: myHandle } = socket;
  try {
    const record = await CHAT.findOne({ channelId }).select("members -_id");
    const { members } = record;
    if (!members.include(myHandle)) socket.join(channelId);
  } catch (e) {}
};
