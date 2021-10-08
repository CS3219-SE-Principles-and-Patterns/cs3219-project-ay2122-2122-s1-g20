const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    rooms: {
        type: Array,
        required: true
    }
});

const User = mongoose.model("chatUser", userSchema);

module.exports = User;