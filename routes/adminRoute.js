const express = require("express");
const { registerAdmin, updateAdmin, getAdminById, getAllAdmins } = require("../controllers/admin.controller");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register-admin", authenticate, registerAdmin);
router.post("/update-admin", authenticate, updateAdmin);
router.get("/get-admin/:id", authenticate, getAdminById);
router.get("/get-all-admin", authenticate, getAllAdmins);

module.exports = router;
