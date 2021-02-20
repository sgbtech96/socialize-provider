const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
const { SIGN_UP } = require("../../../db/models");

module.exports = async (req, res) => {
  const { email, otp, sentOtp } = req.app.locals.data;
  if (sentOtp !== otp) {
    res.send(generateLog("Invalid OTP!"));
    return;
  }
  try {
    await SIGN_UP.findOneAndUpdate(
      { email },
      {
        $set: {
          verified: true,
        },
      }
    );
    res.send(generateSuccess(`OTP verified against ${email}!`));
  } catch (e) {
    res.send(generateError(e));
    return;
  }
};
