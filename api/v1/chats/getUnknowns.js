const { USER, SOCIAL } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");

module.exports = async (req, res) => {
  const { handle } = req.app.locals;
  try {
    const { friends } = await SOCIAL.find({ handle }).select("friends -_id");
    const handlesOfFriends = friends.map((friend) => friend.handle);
    const users = await USER.find({
      handle: {
        $nin: handlesOfFriends,
      },
    }).select("handle name imageUrl tagline -_id");
    res.send(generateSuccess(users));
  } catch (e) {
    res.send(generateError(e));
  }
};
