const Joi = require("joi");
const verifyOtpValidator = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  otp: Joi.number().required(),
});

module.exports = verifyOtpValidator;
