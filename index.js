const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIOServer = require("socket.io");
const io = socketIOServer(server);

const { PORT: port = 8000 } = process.env;
require("./db/connection");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => res.send(`Server is up on port ${port}!!`));
app.use("/onboarding", require("./api/v1/onboarding/routes"));
app.use("/auth", require("./api/v1/auth/routes"));

io.on("connection", (socket) => {
  console.log(`Someone connected to socket.io server!`);
  socket.on("join", async ({ room }) => {
    socket.join(room);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
