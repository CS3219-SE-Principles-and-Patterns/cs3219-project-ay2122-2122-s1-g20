const express = require("express");
const {
  getGroups,
  addGroup,
  removeGroup,
} = require("../controllers/groupsController");

const router = express.Router();

router.get("/:email", getGroups);
router.post("/", addGroup);
router.post("/remove", removeGroup);

module.exports = router;
