const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { verifyToken } = require("./middlewares/requireAuth");
const groupRoutes = require("./routes/groupRoutes");

dotenv.config({ path: "../../config.env" });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.AUTH_PORT || config.port;

app.use(cookieParser());

app.use(cors());
app.use(express.json({ limit: "15360mb" }));
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "15360mb",
    parameterLimit: 500000000,
  })
);

app.use(
  cors({
    exposedHeaders: ["x-access-token", "jwt-salt", "set-cookie"],
    credentials: true,
    origin: true,
    methods: ["OPTIONS", "GET", "HEAD" , "PUT", "PATCH" , "POST" ,"DELETE"],
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
app.use(verifyToken);
app.use("/api/profile", profileRoutes);
app.use("/api/user/account", groupRoutes);

app.get("/", (req, res) => {
  console.log("Test passed");
  res.send("Server is up and running.");
});

app.listen(PORT, () => console.log("Server running on " + PORT));
