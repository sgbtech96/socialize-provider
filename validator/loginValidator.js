const Joi = require("joi");
const loginValidator = Joi.object({
  handle: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = loginValidator;
