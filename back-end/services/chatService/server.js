const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const routes = require("./routes/routes");

dotenv.config({ path: "../../config.env" });

const app = express();
const PORT = process.env.CHAT_PORT || config.port;

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use("/api", routes);
app.get("/", (req, res) => {
  console.log("Test passed");
  res.send("Server is up and running.");
});

const http = require("http").createServer(app);
const options = {
  cors: {
    origin: "http://localhost:3000",
  }
}

const io = require("socket.io")(http, options);

io.on("connection", (socket)=>{
    console.log("user connected");
    console.log(socket.id);
    socket.on("send-message", (message, group) => {
      socket.to(group).emit("receive-message", (message));
    })
    socket.on("join-room", group => {
      socket.join(group);
    })
});

http.listen(PORT, ()=>{
    console.log("connected to port: " + PORT)
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
  
mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"));
