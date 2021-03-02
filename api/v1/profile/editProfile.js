const chalk = require("chalk");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const { USER } = require("../../../db/models");
module.exports = async (req, res) => {
  const { handle } = req.app.locals;
  try {
    const { name, tagline, imageUrl } = req.body;
    await USER.findOneAndUpdate(
      { handle },
      {
        $set: {
          name,
          tagline,
          imageUrl,
        },
      }
    );
    res.send(generateSuccess("Update successful!"));
  } catch (e) {
    console.log(chalk.redBright(e));
    res.send(generateError(e));
  }
};
