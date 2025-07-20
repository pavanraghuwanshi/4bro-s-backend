const express = require("express");
const { registersuperAdmin, updatesuperAdmin } = require("../controllers/superAdmin.controller");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register-superadmin",authenticate, registersuperAdmin);

router.patch("/update-superadmin",authenticate, updatesuperAdmin);

module.exports = router;