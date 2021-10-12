const express = require("express");
const { signup, login } = require("../controllers/authController");
const { uploadMedia, deleteMedia } = require("../controllers/mediaController");
const {
  deleteModules,
  addModules,
} = require("../controllers/modulesController");
const { getGroups, addGroup, removeGroup } = require("../controllers/groupsController");

const router = express.Router();

router.put("/signup", signup);
router.post("/login", login);

router.post("/profilePic", uploadMedia);
router.delete("/profilePic", deleteMedia);

router.post("/modules", addModules);
router.delete("/modules", deleteModules);

router.get("/groups:email", getGroups);
router.post("/groups", addGroup);
router.post("/groups/remove", removeGroup);

module.exports = router;
