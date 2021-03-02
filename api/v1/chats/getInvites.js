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
    const userHandles = invites.map((invite) => {
      if (invite.type === "received") return invite.handle;
    });
    const users = await USER.find({
      handle: {
        $in: userHandles,
      },
    }).select("handle imageUrl -_id");
    let notifications = [];
    users.forEach((user) => {
      notifications.push({ user, type: "invite" });
    });
    res.send(generateSuccess(notifications));
  } catch (e) {
    res.send(generateError(e));
  }
};
