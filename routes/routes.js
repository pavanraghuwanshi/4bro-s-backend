const express = require("express");
const router = express.Router();



const userRoutes = require("./user.route");
const studentRoutes = require("./student.route");


router.use("/user", userRoutes);
router.use("/student", studentRoutes);




module.exports = router;