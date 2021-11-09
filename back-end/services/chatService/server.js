const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const cron = require("node-cron");
const method = require("./controllers/groupController");
const { verifyToken } = require("./middlewares/requireAuth");

dotenv.config({ path: "config.env" });

const app = express();
const PORT = process.env.CHAT_PORT || config.port;

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Test passed");
  res.send("Server is up and running.");
});
app.use(verifyToken);
app.use("/api", routes);

const http = require("http").createServer(app);
const options = {
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["websocket"],
  pingInterval: 1000 * 60 * 5,
  pingTimeout: 1000 * 60 * 3,
};

const io = require("socket.io")(http, options);

io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket.id);
  socket.on("send-message", (message, group) => {
    console.log(message);
    socket.to(group).emit("receive-message", message);
  });
  socket.on("join-room", (group) => {
    socket.join(group);
  });
});

http.listen(PORT, () => {
  console.log("connected to port: " + PORT);
});

const DB =
  app.settings.env == "test"
    ? process.env.TEST_DATABASE.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD
      )
    : process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

cron.schedule("59 23 * * *", function () {
  method.checkAndDeleteGroups();
});

console.log(Date.now());

module.exports = app;
