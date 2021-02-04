const nodemailer = require("nodemailer");
const { ADMIN_EMAIL, ADMIN_EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASS,
  },
});

module.exports = transporter;
