const { USER, SOCIAL, CHAT } = require("../../../db/models");
module.exports = (io, socket) => async (userHandle) => {
  const { myHandle } = socket;
  try {
    const { sockets: userSockets } = await USER.findOne({ userHandle }).select(
      "sockets -_id"
    );
    const myProfile = await USER.findOne({ myHandle }).select(
      "handle name imageUrl tagline -_id"
    );
    userSockets.map((socket) =>
      io.to(socket).emit("INCOMING_ACCEPTANCE", myProfile)
    );
    SOCIAL.findOneAndUpdate(
      { myHandle },
      {
        $pull: {
          invites: { handle: userHandle, group: "received" },
        },
      }
    );
    SOCIAL.findOneAndUpdate(
      { userHandle },
      {
        $pull: {
          invites: { handle: myHandle, group: "sent" },
        },
      }
    );
    const instance = new CHAT({ members: [userHandle, myHandle] });
    instance.save();
  } catch (e) {}
};
