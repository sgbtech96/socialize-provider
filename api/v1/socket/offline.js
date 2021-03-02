const chalk = require("chalk");
const { USER } = require("../../../db/models");
module.exports = (io, socket) => async () => {
  const { handle: myHandle } = socket;
  console.log(chalk.yellowBright(`${myHandle} went offline! ${socket.id}`));
  io.emit("USER_WENT_OFFLINE", myHandle);
  try {
    USER.findOneAndUpdate(
      { handle: myHandle },
      {
        $pull: {
          sockets: socket.id,
        },
      }
    ).exec();
  } catch (e) {
    console.log(chalk.redBright(e));
  }
};
