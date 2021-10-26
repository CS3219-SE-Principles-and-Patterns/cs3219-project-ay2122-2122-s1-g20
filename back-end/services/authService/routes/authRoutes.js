const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.put("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/login", authController.checkToken);

router.post("/logout", authController.logout);

router.post("/emailConfirmation", authController.postReset);

router.post("/resetPassword", authController.postNewPassword);

router.post("/verified", authController.postVerifyEmail);

module.exports = router;
