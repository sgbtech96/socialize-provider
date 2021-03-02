const express = require("express");
const me = require("./getProfile");
const edit = require("./editProfile");
const { auth } = require("../../../middleware");

const router = express.Router();

router.get("/me/:handle?", [auth], me);
router.put("/edit", [auth], edit);

module.exports = router;
