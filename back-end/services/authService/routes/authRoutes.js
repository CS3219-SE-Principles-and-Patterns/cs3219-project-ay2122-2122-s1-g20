const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.put("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/emailConfirmation", authController.postReset);
router.post("/resetPassword", authController.postNewPassword);

module.exports = router;
