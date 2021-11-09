const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const studySessionSchema = mongoose.Schema({
  gid: {
    type: String,
  },
  capacity: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  time: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  date: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
    required: true,
  },
  isOnline: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
});

const Session = mongoose.model("Session", studySessionSchema);

module.exports = Session;
