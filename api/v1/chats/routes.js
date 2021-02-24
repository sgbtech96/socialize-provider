const express = require("express");
const unknowns = require("./getUnknowns");
const friends = require("./getFriends");
const invites = require("./getInvites");
const chats = require("./getChats");
const isOnline = require("./getOnlineStatus");
const { auth } = require("../../../middleware");

const router = express.Router();

router.get("/unknowns", [auth], unknowns);
router.get("/friends", [auth], friends);
router.get("/invites", [auth], invites);
router.get("/isOnline/:userHandle", [auth], isOnline);
router.get("/chat/:channelId", [auth], chats);

module.exports = router;
