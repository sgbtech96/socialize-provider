const { USER } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");

module.exports = async (req, res) => {
  const { userHandle } = req.params;
  try {
    const { sockets } = await USER.find({ handle: userHandle }).select(
      "sockets -_id"
    );
    if (sockets.length > 0)
      res.send(generateSuccess({ handle: userHandle, online: true }));
    else res.send(generateSuccess({ handle: userHandle, online: false }));
  } catch (e) {
    res.send(generateError(e));
  }
};
