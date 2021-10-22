const mongoose = require("mongoose");

const studySessionSchema = mongoose.Schema({
  sid: {
    type: Number,
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
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
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
    required: true,
  },
});

const Session = mongoose.model("Session", studySessionSchema);

module.exports = Session;
