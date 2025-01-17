const Joi = require("joi");
const registerValidator = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in"] },
    })
    .required(),
  handle: Joi.string().min(4).max(8).required(),
  name: Joi.string().min(4).max(8).required(),
  password: Joi.string()
    .pattern(new RegExp("[A-Za-z0-9]{4,}"))
    .min(4)
    .max(12)
    .required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

module.exports = registerValidator;
