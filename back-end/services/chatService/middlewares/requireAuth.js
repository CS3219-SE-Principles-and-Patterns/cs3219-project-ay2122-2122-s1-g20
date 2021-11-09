const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/user");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const salt = req.headers["jwt-salt"];

  if (!token || !salt) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  jwt.verify(token, process.env.TOKEN_KEY + salt, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in." });
    }
    const { userId } = payload;

    const user = await User.findById(userId);

    req.user = user;

    next();
  });
};
