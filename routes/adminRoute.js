const express = require("express");
const { registerAdmin, updateAdmin, getAdminById, getAllAdmins } = require("../controllers/admin.controller");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register-admin", authenticate, registerAdmin);

router.get("/get-admin/:id", authenticate, getAdminById);
router.get("/get-all-admin", authenticate, getAllAdmins);

router.patch("/update-admin", authenticate, updateAdmin);

module.exports = router;
