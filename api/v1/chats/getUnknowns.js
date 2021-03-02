const { USER, SOCIAL } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");

module.exports = async (req, res) => {
  const { handle } = req.app.locals;
  try {
    const { friends, invites } = await SOCIAL.findOne({ handle }).select(
      "friends invites -_id"
    );
    let excludedHandles = [];
    friends.forEach((friend) => {
      excludedHandles.push(friend.handle);
    });
    invites.forEach((invite) => {
      excludedHandles.push(invite.handle);
    });
    const users = await USER.find({
      handle: {
        $nin: [...excludedHandles, handle],
      },
    }).select("handle name imageUrl tagline -_id");
    res.send(generateSuccess(users));
  } catch (e) {
    res.send(generateError(e));
  }
};
