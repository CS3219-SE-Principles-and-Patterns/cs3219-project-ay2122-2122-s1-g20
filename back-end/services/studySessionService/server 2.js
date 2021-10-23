const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv");
const sessionRoutes = require("./routes/routes");

dotenv.config({ path: "../../config.env" });
const PORT = process.env.STUDY_PORT || config.port;

const app = express();
app.use(cors());
const pw = process.env.MONGODB_PASSWORD;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

app.use(express.json()); // application/json

app.use("/api", sessionRoutes);

app.use("/", (req, res, next) => {
  try {
    throw new Error("Invalid api!");
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: "An error occurred!" });
});

app.listen(PORT, () => console.log("Server running on " + PORT));

module.exports = app;
