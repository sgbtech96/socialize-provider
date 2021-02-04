const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const { emailValidator } = require("../../../validator");
const { USER, SIGN_UP } = require("../../../db/models");

const transporter = require("../../../helper/transporter");
module.exports = {
  sendOtp: async (req, res) => {
    let val;
    try {
      val = await emailValidator.validateAsync(req.body);
    } catch (e) {
      res.send(generateLog(e.details[0].message));
      return;
    }
    const { email } = val;
    try {
      const userExists = await USER.findOne({ email });
      if (userExists) {
        res.send(generateLog("This email is unavailable!"));
        return;
      }
      const alreadySent = await SIGN_UP.findOne({ email });
      if (alreadySent) {
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
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "CONNECT account verification code",
      text: `Use ${otp} as your one time authentication code`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        res.send(generateLog("OTP wasn't sent!"));
        return;
      }
      try {
        const record = new SIGN_UP({ email, otp, verified: false, attempts: 0 });
        await record.save();
        res.send(generateSuccess(`OTP sent to email ${email}`));
      } catch (e) {
        res.send(generateError(e));
        return;
      }
    });
  },
};
