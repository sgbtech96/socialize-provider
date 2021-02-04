const { SIGN_UP } = require("../db/models");
const { verifyOtpValidator } = require("../validator/");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../helper/response");
module.exports = async (req, res, next) => {
  let val;
  try {
    val = await verifyOtpValidator.validateAsync(req.body);
  } catch (e) {
    res.send(generateLog(e.details[0].message));
    return;
  }
  const { email, otp } = val;
  try {
    const record = await SIGN_UP.findOne({ email }).select("otp");
    if (!record) {
      res.send(generateLog("No OTP was sent!"));
      return;
    }
    req.app.locals.data = { email, otp, sentOtp: record.otp };
  } catch (e) {
    res.send(generateError(e));
  }
  next();
};
