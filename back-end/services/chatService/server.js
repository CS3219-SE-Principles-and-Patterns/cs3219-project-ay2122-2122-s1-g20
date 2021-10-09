const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');


const routes = require("./routes/routes");

const app = express();
const PORT = 9000;

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
    socket.on("send-message", (message, room) => {
      socket.to(room).emit("receive-message", (message));
    })
});

http.listen(PORT, ()=>{
    console.log("connected to port: " + PORT)
});

//todo: switch database
const DB = "mongodb+srv://admin:admincs3219@cs3219.w1uxq.mongodb.net/chats?retryWrites=true&w=majority";
  
mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"));
