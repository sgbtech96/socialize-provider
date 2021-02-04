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

io.use(require("./middleware/socketAuth")).on(
  "connection",
  require("./api/v1/socket")
);

server.listen(port, () => {
  console.log(`Server is up on port ${port}!!`);
});
