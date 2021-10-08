const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    sid: {
        type: Number,
    },
    hashtag: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    uid: {
        type: Array,
        required: true
    },
    lastModified: {
        type: Number,
        required: true
    }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;