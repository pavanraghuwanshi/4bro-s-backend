const express = require("express");
const { registersuperAdmin, updatesuperAdmin } = require("../controllers/superAdmin.controller");

const router = express.Router();

router.post("/register-superadmin", registersuperAdmin);
router.post("/update-superadmin", updatesuperAdmin);

module.exports = router;