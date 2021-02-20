const sendInvite = require("./sendInvite");
const acceptInvite = require("./acceptInvite");
const active = require("./active");
const offline = require("./offline");
const joinChannel = require("./joinChannel");
const sendMessage = require("./sendMessage");

module.exports = (io) => (socket) => {
  // console.log(`${socket.handle} connected to socket!!`);
  socket.on("SEND_INVITE", sendInvite(io, socket));
  socket.on("ACCEPT_INVITE", acceptInvite(io, socket));
  socket.on("ONLINE", active(io, socket));
  socket.on("JOIN_CHANNEL", joinChannel(io, socket));
  socket.on("SEND_MESSAGE", sendMessage(io, socket));
  socket.on("OFFLINE", offline(io, socket));
};
