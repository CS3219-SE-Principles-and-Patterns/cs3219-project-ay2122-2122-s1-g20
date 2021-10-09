const express = require("express");
const roomController = require("../controllers/roomController");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.route('/rooms')
    .get(roomController.get)
    .post(roomController.create);
router.route('/messages')
    .post(messageController.add);
router.route('/messages/:room_id')
    .get(messageController.retrieve);

module.exports = router;