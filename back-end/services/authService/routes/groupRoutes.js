const express = require("express");
const {
  getGroups,
  addGroup,
  removeGroup,
} = require("../controllers/groupsController");

const router = express.Router();

router.get("/groups/:email", getGroups);
router.post("/groups", addGroup);
router.post("/groups/remove", removeGroup);

module.exports = router;
