const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const { emailValidator } = require("../../../validator");
const { SIGN_UP } = require("../../../db/models");

const sendMail = require("../../../helper/sendMail");
module.exports = async (req, res) => {
  let validatedData;
  try {
    validatedData = await emailValidator.validateAsync(req.body);
  } catch (e) {
    res.send(generateLog(e.details[0].message));
    return;
  }
  const { email } = validatedData;
  try {
    const record = await SIGN_UP.findOne({ email }).select(
      "verified registered -_id"
    );
    if (record?.registered) {
      res.send(generateLog("An account is already associated to this email!"));
      return;
    } else if (record?.verified) {
      res.send(generateLog("OTP is already verified against this email!"));
      return;
    } else if (record) {
      res.send(generateLog("An OTP has already been sent to this email!"));
      return;
    }
  } catch (e) {
    res.send(generateError(e));
    return;
  }
  let lo = 1000,
    hi = 9999;
  const otp = Math.floor(Math.random() * (hi - lo + 1)) + lo;
  sendMail(email, otp)
    .then(async (result) => {
      console.log(result);
      try {
        const newSignUp = new SIGN_UP({ email, otp });
        await newSignUp.save();
        res.send(generateSuccess(`OTP sent to email ${email}`));
      } catch (e) {
        res.send(generateError(e));
        return;
      }
    })
    .catch((e) => {
      res.send(generateLog("OTP wasn't sent!"));
      return;
    });
};
