const express = require("express");
const { uploadMedia, deleteMedia } = require("../controllers/mediaController");
const {
  deleteModules,
  addModules,
} = require("../controllers/modulesController");

const router = express.Router();

// Profile picture
router.post("/profilePic", uploadMedia);
router.delete("/profilePic", deleteMedia);

// Modules
router.post("/modules", addModules);
router.delete("/modules", deleteModules);

module.exports = router;
