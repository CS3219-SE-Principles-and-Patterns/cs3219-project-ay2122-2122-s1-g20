const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.put("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/login", authController.checkToken);

router.post("/logout", authController.logout);

router.post("/updateEmail", authController.updateEmail);

router.post("/updateUsername", authController.updateUsername);

router.post("/updatePassword", authController.updatePassword);

router.post("/emailConfirmation", authController.postReset);

router.post("/resetPassword", authController.postNewPassword);

router.post("/verified", authController.postVerifyEmail);

router.post("/authentication", authController.verifyToken);

module.exports = router;
