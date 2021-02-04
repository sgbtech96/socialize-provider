const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { USER } = require("../db/models");

module.exports = async (socket, next) => {
  const rawToken = socket.handshake.auth.token;

  if (!rawToken || !rawToken.startsWith("Bearer ")) {
    const err = new Error("Not authorized");
    next(err);
  }
  const encodedToken = rawToken.substring(7, rawToken.length);
  let decodedToken;
  try {
    decodedToken = await jwt.verify(encodedToken, SECRET_KEY);
    const { handle } = decodedToken;
    const record = await USER.findOne({ handle }).select("tokens");
    if (!record) {
      const err = new Error("Not authorized");
      next(err);
    }
    const ifTokenExists = record.tokens.filter(
      (tokenObj) => tokenObj.token === encodedToken
    );

    if (ifTokenExists.length == 0) {
      const err = new Error("Not authorized");
      next(err);
    }
    next();
  } catch (e) {
    const err = new Error("Not authorized");
    next(err);
  }
};
