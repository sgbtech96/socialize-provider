const chalk = require("chalk");
const express = require("express");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const socketIOServer = require("socket.io");
const io = socketIOServer(httpServer, {
  cors: true,
  origins: ["https://shhh-secure-chat.herokuapp.com/", "http://localhost:3000/"],
});

const { PORT: port = 8000 } = process.env;
require("./db/connection");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => res.send(`Server is up on port ${port}!!`));
app.use("/api/v1", require("./api/v1"));

io.use(require("./middleware/socketAuth")).on(
  "connection",
  require("./api/v1/socket/routes")(io)
);

httpServer.listen(port, () => {
  console.log(chalk.greenBright(`Server is up on port ${port}!!`));
});
