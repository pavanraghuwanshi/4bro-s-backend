const jwt = require('jsonwebtoken');
const Admin = require("../models/admin.model");
const SuperAdmin = require('../models/superAdmin.model');
const User = require('../models/user.model');
const Driver = require('../models/driver.model');

const authenticate = async (req, res, next) => {
  try {
    const token = (req.header("Authorization") && req.header("Authorization").replace("Bearer ", "")) || req.cookies.token || req.body.token;

    if (!token) return res.status(401).json({ success: false, message: "Token Missing or Invalid", });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = decoded.role;

    if (role === 1) {
      const user = await SuperAdmin.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = decoded;
      return next();
    }
    if (role === 2) {
      const user = await Admin.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = decoded;
      return next();
    }
    if (role === 3) {
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = decoded;
      req.user.adminId = user.adminId;
      return next();
    }
    if (role === 4) {
      const user = await Driver.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      req.user = decoded;
      return next();
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
