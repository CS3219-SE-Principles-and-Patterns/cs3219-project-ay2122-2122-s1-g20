const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

// after creating study session, call another api to update user database under 'sessions' field
router.post("/", sessionController.createSession);
// router.get("/upcoming", sessionController.getUpcomingSession);

router.delete("/:sid", sessionController.deleteSession);

router.put("/:sid", sessionController.editStudySession);

module.exports = router;
