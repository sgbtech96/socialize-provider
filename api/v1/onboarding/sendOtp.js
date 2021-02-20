const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const { emailValidator } = require("../../../validator");
const { SIGN_UP } = require("../../../db/models");

const transporter = require("../../../helper/transporter");
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
    const record = await SIGN_UP.findOne({ email }).select("verified -_id");
    if (record) {
      res.send(
        generateLog(
          `${
            record.verified
              ? "An account is already associated to this email!"
              : "An OTP has already been sent to this email!"
          }`
        )
      );
      return;
    }
  } catch (e) {
    res.send(generateError(e));
    return;
  }
  let lo = 1000,
    hi = 9999;
  const otp = Math.floor(Math.random() * (hi - lo + 1)) + lo;
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: "Forny account verification code",
    text: `Use ${otp} as your one time authentication code`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      res.send(generateLog("OTP wasn't sent!"));
      return;
    }
    try {
      const newSignUp = new SIGN_UP({ email, otp });
      await newSignUp.save();
      res.send(generateSuccess(`OTP sent to email ${email}`));
    } catch (e) {
      res.send(generateError(e));
      return;
    }
  });
};
