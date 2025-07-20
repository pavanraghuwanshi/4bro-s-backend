const express = require("express");
const { registerUser, updateUser, getUserById, getAllUsers, deleteUser } = require("../controllers/user.controller");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register-user", authenticate, registerUser);

router.get("/get-user/:id", authenticate, getUserById);
router.get("/get-all-user", authenticate, getAllUsers);

router.patch("/update-user", authenticate, updateUser);

router.delete("/delete-user/:id", authenticate, deleteUser);


module.exports = router;