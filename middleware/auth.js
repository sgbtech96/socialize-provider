const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { USER } = require("../db/models");
const { generateLog, generateError } = require("../helper/response");

const errorMessage = "You are not authorized to view this page!";

module.exports = async (req, res, next) => {
  const rawToken = req.headers.authorization;

  if (!rawToken || !rawToken.startsWith("Bearer ")) {
    res.send(generateError(errorMessage));
    return;
  }
  const encodedToken = rawToken.substring(7, rawToken.length);
  let decodedToken;
  try {
    decodedToken = await jwt.verify(encodedToken, SECRET_KEY);
    const { handle } = decodedToken;
    const record = await USER.findOne({ handle }).select("tokens -_id");
    if (!record) {
      res.send(generateError(errorMessage));
      return;
    }
    const ifTokenExists = record.tokens.filter((token) => token === encodedToken);

    if (ifTokenExists.length == 0) {
      res.send(generateError(errorMessage));
      return;
    }

    req.app.locals.handle = handle;
    req.app.locals.token = encodedToken;
    next();
  } catch (e) {
    res.send(generateError(errorMessage));
    return;
  }
};
