const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    room_id: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;