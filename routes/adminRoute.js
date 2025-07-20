const express = require("express");
const { registerAdmin, updateAdmin } = require("../controllers/admin.controller");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register-admin", authenticate, registerAdmin);
router.post("/update-admin", authenticate, updateAdmin);

module.exports = router;
