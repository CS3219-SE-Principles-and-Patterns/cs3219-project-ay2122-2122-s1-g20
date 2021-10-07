const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.put("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/resetPassword", authController.getReset);
router.post("/resetPassword", authController.postReset);

module.exports = router;
