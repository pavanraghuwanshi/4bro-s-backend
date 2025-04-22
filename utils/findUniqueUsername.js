const Admin = require('../models/admin.model');
const Collage = require('../models/collage.model');
const Branch = require('../models/branch.model');
const Hod = require('../models/hod.model');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');

const findSameUsername = async (username) => {
     try {
          if (!username) throw new Error("Username is required");

          const queries = [
               Collage.findOne({ username }).lean(),
               Branch.findOne({ username }).lean(),
               Hod.findOne({ username }).lean(),
               Teacher.findOne({ username }).lean(),
               Student.findOne({ username }).lean(),
          ];

          const results = await Promise.all(queries);

          if (results.some((result) => result)) {
               return { message: "Username already exists", exists: true };
          }

          return { message: "Username is available", exists: false };
     } catch (error) {
          console.error("Error finding username:", error.message);
          throw new Error("An error occurred while checking username availability.");
     }
};

module.exports = findSameUsername;
