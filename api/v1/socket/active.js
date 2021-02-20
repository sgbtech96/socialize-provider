const chalk = require("chalk");
const { USER } = require("../../../db/models");
module.exports = (io, socket) => async () => {
  const { handle: myHandle } = socket;
  socket.broadcast.emit("USER_CAME_ONLINE", myHandle);
  // console.log(chalk.blueBright(`${myHandle} came online! ${socket.id}`));
  try {
    const record = await USER.findOneAndUpdate(
      { handle: myHandle },
      {
        $push: {
          sockets: socket.id,
        },
      },
      { new: true }
    );
    // console.log(chalk.greenBright(record));
  } catch (e) {
    console.log(chalk.redBright(e));
  }
};
