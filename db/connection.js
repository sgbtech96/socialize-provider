const mongoose = require("mongoose");
const { DB_PASS } = process.env;
mongoose
  .connect(
    `mongodb+srv://sgbtech96:${DB_PASS}@cluster0-hluvl.mongodb.net/chat_application?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log(`Successfully established a connection to db!`))
  .catch((e) => console.log(`Something went wrong while connecting to db!`));
