const { USER } = require("../../../db/models");
module.exports = (io, socket) => async () => {
  const { handle: myHandle } = socket;
  io.emit("USER_WENT_OFFLINE", myHandle);
  try {
    await USER.findOneAndUpdate(
      { handle: myHandle },
      {
        $pull: {
          sockets: socket.id,
        },
      }
    );
  } catch (e) {}
};
