const { SIGN_UP, USER } = require("../db/models");
const { generateLog, generateError } = require("../helper/response");
const { registerValidator } = require("../validator");
module.exports = async (req, res, next) => {
  let validatedData;
  try {
    validatedData = await registerValidator.validateAsync(req.body);
  } catch (e) {
    res.send(generateLog(e.details[0].message));
    return;
  }
  const { email, handle } = validatedData;
  try {
    const record = await SIGN_UP.findOne({ email }).select(
      "verified registered -_id"
    );
    if (!record?.verified) {
      res.send(generateLog("Please verify your email first!"));
      return;
    }
    if (record?.registered) {
      res.send(generateLog("An account is already associated to this email!"));
      return;
    }
    const handleExists = await USER.findOne({ handle });
    if (handleExists) {
      res.send(generateLog("This handle already exists!"));
      return;
    }
    next();
  } catch (e) {
    res.send(generateError(e));
  }
};
