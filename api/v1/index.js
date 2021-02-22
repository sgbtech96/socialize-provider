const express = require("express");
const router = express.Router();

router.use("/onboarding", require("./onboarding/routes"));
router.use("/auth", require("./auth/routes"));
router.use("/profile", require("./profile/routes"));
router.use("/chats", require("./chats/routes"));

module.exports = router;
