const chalk = require("chalk");
const { USER, SOCIAL } = require("../../../db/models");
module.exports = (io, socket) => async (userHandle) => {
  const { handle: myHandle } = socket;
  // console.log(chalk.blueBright(`SEND_INVITE ${myHandle} ${userHandle}`));
  try {
    const { sockets: userSockets } = await USER.findOne({
      handle: userHandle,
    }).select("sockets -_id");
    const myProfile = await USER.findOne({ handle: myHandle }).select(
      "handle imageUrl -_id"
    );
    userSockets.map((socket) => io.to(socket).emit("INCOMING_INVITE", myProfile));
    SOCIAL.findOneAndUpdate(
      { handle: myHandle },
      {
        $push: {
          invites: { handle: userHandle, group: "sent" },
        },
      }
    );
    // console.log(chalk.greenBright(rec));
    SOCIAL.findOneAndUpdate(
      { handle: userHandle },
      {
        $push: {
          invites: { handle: myHandle, group: "received" },
        },
      }
    );
  } catch (e) {
    console.log(chalk.redBright(e));
  }
};
