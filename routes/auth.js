const express = require("express");
const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.get("/current", authMiddleware, authController.getCurrentUser);

module.exports = router;
