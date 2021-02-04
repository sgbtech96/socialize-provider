module.exports = (socket) => {
  console.log(`Someone connected to socket!!`);
  socket.on("join", async ({ room }) => {
    socket.join(room);
  });
};
