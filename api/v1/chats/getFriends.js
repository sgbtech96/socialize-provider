const { SOCIAL, USER } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");

module.exports = async (req, res) => {
  const { handle } = req.app.locals;
  try {
    const record = await SOCIAL.findOne({ handle }).select("friends -_id");
    if (!record) {
      res.send(generateSuccess([]));
      return;
    }
    const { friends } = record;
    const handlesOfFriends = friends.map((friend) => friend.handle);
    let users = await USER.find({
      handle: {
        $in: handlesOfFriends,
      },
    }).select("handle name imageUrl tagline -_id");
    users.forEach((user) => {
      friends.forEach((friend) => {
        if (user.handle === friend.handle) user.channelId = friend.channelId;
      });
    });
    res.send(generateSuccess(users));
  } catch (e) {
    res.send(generateError(e));
  }
};
