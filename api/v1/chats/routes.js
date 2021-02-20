const express = require("express");
const users = require("./getUsers");
const friends = require("./getFriends");
const invites = require("./getInvites");
const chats = require("./getChats");
const { auth } = require("../../../middleware");

const router = express.Router();

router.get("/unknowns", [auth], users);
router.get("/friends", [auth], friends);
router.get("/invites", [auth], invites);
router.get("/chat/:channelId", [auth], chats);

module.exports = router;
