const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
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
        type: [String],
        required: true
    },
    lastModified: {
        type: Number,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    timeOfDisable : {
        type: Number,
    }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;