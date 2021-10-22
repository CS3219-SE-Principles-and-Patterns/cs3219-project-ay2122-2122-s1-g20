const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.put("/create", sessionController.createSession);

router.delete("/delete/:sid", sessionController.deleteSession);

router.put("/edit/:sid", sessionController.editStudySession);

module.exports = router;
