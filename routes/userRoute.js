const express = require("express");
const { registerUser, updateUser } = require("../controllers/user.controller");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register-user", authenticate, registerUser);
router.post("/update-user", authenticate, updateUser);

module.exports = router;