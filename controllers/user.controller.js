const jwt = require('jsonwebtoken');

const Admin = require('../models/admin.model');
const Collage = require('../models/collage.model');
const Branch = require('../models/branch.model');
const Hod = require('../models/hod.model');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');



exports.loginUser = async (req, res) => {
     const { username, password } = req.body;
     let user;
     let isMatch = false;
   
     if (!username || !password) {
       return res.status(400).json({ message: 'Please enter valid details' });
     }
   
     try {
       // Find user in various collections
       user = await Admin.findOne({ username });
       if (!user) user = await Collage.findOne({ username });
       if (!user) user = await Branch.findOne({ username }).populate("collageId", "username");
       if (!user) user = await Hod.findOne({ username }).populate("branchId", "username");
       if (!user) user = await Teacher.findOne({ username }).populate("hodId", "username");
       if (!user) user = await Student.findOne({ username }).populate("teacherId", "username");
   
       if (!user) {
         return res.status(400).json({ message: 'Invalid credentials' });
       }
   
       // Validate password
       isMatch = await user.comparePassword(password);
       if (!isMatch) {
         return res.status(400).json({ message: 'Incorrect password or email ID' });
       }
   
       // Generate JWT token
       const token = jwt.sign(
         {
           id: user._id,
           username: user.username,
           role: user.role,
           collageId: user.collageId?._id,
           branchId: user.branchId?._id,
           hodId: user.hodId?._id,
           teacherId: user.teacherId?._id,
           studentId: user.studentId?._id,
           chatusername: user.teacherId?.username ||
                         user.hodId?.username ||
                         user.branchId?.username ||
                         user.collageId?.username ||
                         "harshalsir"
         },
         process.env.JWT_SECRET,
       );
   
       res.status(200).json({
         message: "Successful Login",
         token,
         role: user.role,
         username: user.username
       });
   
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
   };