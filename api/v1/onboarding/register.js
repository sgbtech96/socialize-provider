const bcrypt = require("bcrypt");
const { USER, SIGN_UP } = require("../../../db/models");
const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../../../helper/response");
module.exports = {
  register: async (req, res) => {
    const { email, handle, password } = req.body;
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) res.send(generateError(err));
      try {
        const user = new USER({ email, handle, password: hash, tokens: [] });
        await user.save();
        await SIGN_UP.findOneAndDelete({ email });
        res.send(generateSuccess("Registered successfully!"));
      } catch (e) {
        res.send(generateError(e));
        return;
      }
    });
  },
};
