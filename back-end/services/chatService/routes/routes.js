const express = require("express");
const groupController = require("../controllers/groupController");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.route("/groups").get(groupController.get).post(groupController.create);
router.route("/group/users").post(groupController.addUser);
router.route("/group/users/remove").post(groupController.removeUser);
router.route("/group/users/update").post(groupController.updateState);
router.route("/groups/:group_id").get(groupController.retrieveGroup);
router.route("/groups/:group_id").delete(groupController.delete);
router.route("/groups/users/:creator").get(groupController.getGroupsCreated);
router.route("/messages").post(messageController.add);
router.route("/messages/:group_id").get(messageController.retrieve);

module.exports = router;
