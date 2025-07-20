const express = require("express");
const router = express.Router();
const superAdminRoutes = require("./superAdminRoute");
const adminRoutes = require("./adminRoute");
const userRoutes = require("./userRoute");
const driverRoutes = require("./driverRoute");

const loginRoutes = require("./loginRoute");
router.use("/login", loginRoutes);

router.use("/superadmin", superAdminRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/driver", driverRoutes);

module.exports = router;
