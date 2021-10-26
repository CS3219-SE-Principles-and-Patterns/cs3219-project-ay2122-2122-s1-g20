const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

// after creating study session, call another api to update user database under 'sessions' field
router.post("/", sessionController.createSession);
router.get("/upcoming/:username", sessionController.getUpcomingSessions);
router.get("/my/:username", sessionController.getMySessions);
router.get("/joined/:username", sessionController.getJoinedSessions);
router.get("/:sid", sessionController.getASession);

router.delete("/:sid", sessionController.deleteSession);

router.put("/:sid", sessionController.editStudySession);

module.exports = router;
