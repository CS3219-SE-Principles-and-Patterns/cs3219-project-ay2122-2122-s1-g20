const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const sessionRoutes = require("./routes/sessionRoutes");
const { verifyToken } = require("../chatService/middlewares/requireAuth");

dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.STUDY_PORT || config.port;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    // limit: "15360mb",
    // parameterLimit: 500000000,
  })
);

app.use(
  cors({
    exposedHeaders: ["x-access-token"],
  })
);

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

app.get("/", (req, res) => {
  console.log("Test passed");
  res.send("Server is up and running.");
});
app.use(verifyToken);
app.use("/api/session", sessionRoutes);

app.listen(PORT, () => console.log("Server running on " + PORT));

module.exports = app;
