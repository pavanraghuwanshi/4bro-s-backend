const Admin = require("../models/admin.model");
const Driver = require("../models/driver.model");
const SuperAdmin = require("../models/superAdmin.model");
const User = require("../models/user.model");

const findSameUsername = async (username) => {
     try {
          if (!username) throw new Error("Username is required");
          const queries = [
               SuperAdmin.findOne({ username }).lean(),
               Admin.findOne({ username }).lean(),
               User.findOne({ username }).lean(),
               Driver.findOne({ username }).lean()
          ];

          const results = await Promise.all(queries);
          if (results.some((result) => result)) return { message: "Username already exists", exists: true };
          return { message: "Username is available", exists: false };
     } catch (error) {
          console.error("Error finding username:", error.message);
          throw new Error("An error occurred while checking username availability.");
     }
};

module.exports = findSameUsername;
