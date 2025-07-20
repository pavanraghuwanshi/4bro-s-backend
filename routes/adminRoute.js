const express = require("express");
const { registerAdmin, updateAdmin } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/update-admin", updateAdmin);

module.exports = router;
