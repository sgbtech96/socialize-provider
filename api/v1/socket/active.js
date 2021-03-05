const chalk = require("chalk");
const { USER } = require("../../../db/models");
module.exports = (io, socket) => async () => {
  const { handle: myHandle } = socket;
  // console.log(chalk.blueBright(`${myHandle} came online! ${socket.id}`));
  socket.broadcast.emit(`USER_CAME_ONLINE`, myHandle);
  try {
    USER.findOneAndUpdate(
      { handle: myHandle },
      {
        $push: {
          sockets: socket.id,
        },
      }
    ).exec();
  } catch (e) {
    // console.log(chalk.redBright(e));
  }
};
