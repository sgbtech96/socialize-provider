const express = require("express");
const { login } = require("./login");
const { logout } = require("./logout");
const { auth } = require("../../../middleware");

const router = express.Router();

router.post("/login", login);
router.get("/logout", [auth], logout);

module.exports = router;
