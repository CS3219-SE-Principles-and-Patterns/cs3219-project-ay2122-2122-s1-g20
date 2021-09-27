const express = require("express");
const cors = require("cors");
const config = require("./config");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || config.port;

app.use(cors());
app.use(express.json({ limit: "15360mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "15360mb",
    parameterLimit: 500000000,
  })
);

app.use(
  cors({
    exposedHeaders: ["Content-Range"],
  })
);

app.use("/api/user", authRoutes);

app.get("/", (req, res) => {
  console.log("Test passed");
  res.send("Server is up and running.");
});

app.listen(PORT, () => console.log("Server running on " + PORT));

module.exports = { io };
