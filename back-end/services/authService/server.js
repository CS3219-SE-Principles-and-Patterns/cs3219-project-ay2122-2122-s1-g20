const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config({ path: "../../config.env" });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.AUTH_PORT || config.port;

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

app.use("/api/user", authRoutes);
app.use("/api/user/account", userRoutes);

app.get("/", (req, res) => {
  console.log("Test passed");
  res.send("Server is up and running.");
});

app.listen(PORT, () => console.log("Server running on " + PORT));
