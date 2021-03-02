const bcrypt = require("bcrypt");
const { USER, SOCIAL, SIGN_UP } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
module.exports = async (req, res) => {
  const { email, handle, name, password } = req.body;
  bcrypt.hash(password, 8, async (err, hash) => {
    if (err) res.send(generateError(err));
    try {
      await SIGN_UP.findOneAndUpdate(
        { email },
        {
          $set: {
            registered: true,
          },
        }
      );
      const newUser = new USER({ email, handle, name, password: hash });
      await newUser.save();
      const newSocial = new SOCIAL({ handle });
      await newSocial.save();
      res.send(generateSuccess("Registered successfully!"));
    } catch (e) {
      res.send(generateError(e));
      return;
    }
  });
};
