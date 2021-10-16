const express = require("express");
const { uploadMedia, deleteMedia } = require("../controllers/mediaController");
const {
  deleteModules,
  addModules,
} = require("../controllers/modulesController");
const { getGroups, addGroup, removeGroup } = require("../controllers/groupsController");

const router = express.Router();

// Profile picture
router.post("/profilePic", uploadMedia);
router.delete("/profilePic", deleteMedia);

// Modules
router.post("/modules", addModules);
router.delete("/modules", deleteModules);

router.get("/groups/:email", getGroups);
router.post("/groups", addGroup);
router.post("/groups/remove", removeGroup);

module.exports = router;
