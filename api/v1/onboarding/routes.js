const express = require("express");
const sendOtp = require("./sendOtp");
const verifyOtp = require("./verifyOtp");
const register = require("./register");
const { isOtpSent, canRegister } = require("../../../middleware");

const router = express.Router();

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", [isOtpSent], verifyOtp);
router.post("/register", [canRegister], register);

module.exports = router;
