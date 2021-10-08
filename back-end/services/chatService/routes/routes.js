const express = require("express");
const controller = require("../controllers/roomController");

const router = express.Router();

router.route('/rooms')
    .get(controller.get)
    .post(controller.create);

module.exports = router;