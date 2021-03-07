const chalk = require("chalk");
const { USER } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { loginValidator } = require("../../../validator");

const errorMessage = "Either handle or password is incorrect!";
const ONE_YEAR = 60 * 60 * 24 * 30 * 12;

module.exports = async (req, res) => {
  let validatedData;
  try {
    validatedData = await loginValidator.validateAsync(req.body);
  } catch (e) {
    res.send(generateLog(e.details[0].message));
    return;
  }
  try {
    const { handle, password } = validatedData;
    const user = await USER.findOne({ handle }).select(
      "handle password tokens -_id"
    );
    if (!user) {
      res.send(generateLog(errorMessage));
      return;
    }
    const orgHash = user.password;
    const isMatch = await bcrypt.compare(password, orgHash);
    if (!isMatch) {
      res.send(generateLog(errorMessage));
      return;
    }
    if (user.tokens.length > 2) {
      res.send(
        generateLog("You have exceeded session limit, logout of atleast 1 device!")
      );
      return;
    }
    // console.log(chalk.blueBright("/login"));
    const token = jwt.sign({ handle }, SECRET_KEY, {
      expiresIn: ONE_YEAR,
    });
    await USER.findOneAndUpdate(
      { handle },
      {
        $push: {
          tokens: token,
        },
      }
    );
    res.send(generateSuccess({ token }));
  } catch (e) {
    res.send(generateError(e));
    return;
  }
};
