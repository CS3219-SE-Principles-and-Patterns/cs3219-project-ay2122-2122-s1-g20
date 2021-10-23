const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.put("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/emailConfirmation", authController.postReset);

router.post("/resetPassword", authController.postNewPassword);

router.post("/verified", authController.postVerifyEmail);

router.post("/authentication", authController.verifyToken);

module.exports = router;
