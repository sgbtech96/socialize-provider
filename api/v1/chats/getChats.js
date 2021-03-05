const { CHAT } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");

module.exports = async (req, res) => {
  const { handle } = req.app.locals;
  const { channelId } = req.params;
  try {
    const record = await CHAT.findOne({ channelId }).select("members chats -_id");
    const { members, chats } = record;
    if (!members.includes(handle))
      res.send(generateLog("Unauthorized for this channel!"));
    res.send(generateSuccess(chats));
  } catch (e) {
    // console.log(e);
    res.send(generateError(e));
  }
};
