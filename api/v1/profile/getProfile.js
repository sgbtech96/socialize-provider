const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const { USER } = require("../../../db/models");
module.exports = async (req, res) => {
  let handle;
  handle = req.params.handle;
  if (!handle) handle = req.app.locals.handle;
  try {
    const userProfile = await USER.findOne({ handle }).select(
      "name handle tagline imageUrl -_id"
    );
    res.send(generateSuccess(userProfile));
  } catch (e) {
    res.send(generateError(e));
  }
};
