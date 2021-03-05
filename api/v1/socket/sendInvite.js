const chalk = require("chalk");
const { USER, SOCIAL } = require("../../../db/models");
module.exports = (io, socket) => async (userHandle) => {
  const { handle: myHandle } = socket;
  // console.log(chalk.blueBright(`${myHandle} invited ${userHandle}!`));
  try {
    const { sockets: userSockets } = await USER.findOne({
      handle: userHandle,
    }).select("sockets -_id");
    const myProfile = await USER.findOne({ handle: myHandle }).select(
      "handle name imageUrl -_id"
    );
    userSockets.map((socket) => io.to(socket).emit("INCOMING_INVITE", myProfile));
    SOCIAL.findOneAndUpdate(
      { handle: myHandle },
      {
        $push: {
          invites: { handle: userHandle, type: "sent" },
        },
      }
    ).exec();
    SOCIAL.findOneAndUpdate(
      { handle: userHandle },
      {
        $push: {
          invites: { handle: myHandle, type: "received" },
        },
      }
    ).exec();
  } catch (e) {
    // console.log(chalk.redBright(e));
  }
};
