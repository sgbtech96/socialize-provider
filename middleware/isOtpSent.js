const { SIGN_UP } = require("../db/models");
const { verifyOtpValidator } = require("../validator/");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../helper/response");
module.exports = async (req, res, next) => {
  let validatedData;
  try {
    validatedData = await verifyOtpValidator.validateAsync(req.body);
  } catch (e) {
    res.send(generateLog(e.details[0].message));
    return;
  }
  const { email, otp } = validatedData;
  try {
    const record = await SIGN_UP.findOne({ email }).select("otp -_id");
    if (!record) {
      res.send(generateLog(`No OTP was sent to ${email}!`));
      return;
    }
    req.app.locals.data = { email, otp, sentOtp: record.otp };
  } catch (e) {
    res.send(generateError(e));
  }
  next();
};
