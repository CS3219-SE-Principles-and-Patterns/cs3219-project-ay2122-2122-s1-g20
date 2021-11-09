const express = require("express");
const groupController = require("../controllers/groupController");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.route("/groups").get(groupController.get).post(groupController.create);
router.route("/groups/users").post(groupController.addUser);
router.route("/groups/users/remove").post(groupController.removeUser);
router.route("/groups/users/update").post(groupController.updateState);
router
  .route("/groups/:group_id")
  .get(groupController.retrieveGroup)
  .post(groupController.updateGroup)
  .delete(groupController.delete);
router.route("/groups/users/:creator").get(groupController.getGroupsCreated);

router.route("/messages").post(messageController.add);
router.route("/messages/:group_id").get(messageController.retrieve);

module.exports = router;
