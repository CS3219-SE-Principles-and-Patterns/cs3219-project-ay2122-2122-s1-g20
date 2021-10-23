const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

// after creating study session, call another api to update user database under 'sessions' field
router.post("/", sessionController.createSession);
router.get("/upcoming", sessionController.getUpcomingSessions);
router.get("/my/:uid", sessionController.getMySessions);
router.get("/past/:uid", sessionController.getPastSessions);
router.get("/:sid", sessionController.getASession);

router.delete("/:sid", sessionController.deleteSession);

router.put("/:sid", sessionController.editStudySession);

module.exports = router;
