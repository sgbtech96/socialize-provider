const chalk = require("chalk");
const uniqueString = require("unique-string");
const { USER, SOCIAL, CHAT } = require("../../../db/models");
module.exports = (io, socket) => async (userHandle) => {
  const { handle: myHandle } = socket;
  console.log(chalk.yellowBright(`${myHandle} accepted ${userHandle}'s request!`));
  try {
    const rec = await USER.find({
      handle: {
        $in: [myHandle, userHandle],
      },
    }).select("handle name imageUrl tagline sockets -_id");

    let myProfile, userProfile;
    if (rec[0].handle === myHandle) {
      myProfile = rec[0];
      userProfile = rec[1];
    } else {
      myProfile = rec[1];
      userProfile = rec[0];
    }
    const channelId = uniqueString();
    myProfile.sockets.map((socketId) =>
      io.to(socketId).emit("REQUEST_ACCEPTED", {
        user: { ...userProfile.toObject(), channelId, sockets: undefined },
        acceptedBy: myHandle,
      })
    );
    userProfile.sockets.map((socketId) =>
      io.to(socketId).emit("REQUEST_ACCEPTED", {
        user: { ...myProfile.toObject(), channelId, sockets: undefined },
        acceptedBy: myHandle,
      })
    );
    SOCIAL.findOneAndUpdate(
      { handle: myHandle },
      {
        $pull: {
          invites: { handle: userHandle, type: "received" },
        },
        $push: {
          friends: { handle: userHandle, channelId },
        },
      }
    ).exec();
    SOCIAL.findOneAndUpdate(
      { handle: userHandle },
      {
        $pull: {
          invites: { handle: myHandle, type: "sent" },
        },
        $push: {
          friends: { handle: myHandle, channelId },
        },
      }
    ).exec();
    const instance = new CHAT({ channelId, members: [userHandle, myHandle] });
    instance.save();
  } catch (e) {
    console.log(chalk.redBright(e));
  }
};
