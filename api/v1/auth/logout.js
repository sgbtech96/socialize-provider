const { USER } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");

module.exports = async (req, res) => {
  const { handle, token } = req.app.locals;
  try {
    await USER.findOneAndUpdate(
      { handle },
      {
        $pull: {
          tokens: token,
        },
      }
    );
    res.send(generateLog("Logged out!"));
  } catch (e) {
    generateError(e);
    return;
  }
};
