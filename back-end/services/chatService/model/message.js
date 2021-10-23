const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  group_id: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
