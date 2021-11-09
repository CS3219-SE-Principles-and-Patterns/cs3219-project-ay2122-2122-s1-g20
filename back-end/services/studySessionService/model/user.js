const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  modules: {
    type: [Object],
    required: false,
  },
  uniqueString: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  groups: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
    default: [],
  },
  jwtSalt: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
