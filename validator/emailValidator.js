const Joi = require("joi");
const emailValidator = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in"] },
    })
    .required(),
});

module.exports = emailValidator;
