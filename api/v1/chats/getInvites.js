const { SOCIAL, USER } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");

module.exports = async (req, res) => {
  const { handle } = req.app.locals;
  try {
    const record = await SOCIAL.findOne({ handle }).select("invites -_id");
    const { invites } = record;
    const userHandles = invites.map((invite) => invite.handle);
    const users = await USER.find({
      handle: {
        $in: userHandles,
      },
    }).select("handle imageUrl -_id");
    res.send(generateSuccess(users));
  } catch (e) {
    res.send(generateError(e));
  }
};
