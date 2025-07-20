const express = require("express");
const { registerUser, updateUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/update-user", updateUser);

module.exports = router;