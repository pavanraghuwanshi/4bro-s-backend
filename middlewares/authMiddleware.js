const jwt = require('jsonwebtoken');

const Admin = require('../models/admin.model');
const Collage = require('../models/collage.model');
const Branch = require('../models/branch.model');
const Hod = require('../models/hod.model');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');


const authenticate = async(req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from headers

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    let user;
    let sperr = false;
    
    user = await Admin.findById(decoded.id);
    if (user) {
      req.user = { id: decoded.id, role: 'admin' };
      sperr = true;
    } else {
      user = await Collage.findById(decoded.id);
      if (user) {
        req.user = { id: user._id, role: 'collage' };
        sperr = true;
      } else {
        user = await Branch.findById(decoded.id);
        if (user) {
          req.user = { id: user._id, role: 'branch', collageId: user.collageId };
          sperr = true;
        } else {
          user = await Hod.findById(decoded.id);
          if (user) {
            req.user = {
              id: user._id,
              role: 'hod',
              collageId: user.collageId,
              branchId: user.branchId,
            };
            sperr = true;
          } else {
            user = await Teacher.findById(decoded.id);
            if (user) {
              req.user = {
                id: user._id,
                role: 'teacher',
                collageId: user.collageId,
                branchId: user.branchId,
                hodId: user.hodId,
              };
              sperr = true;
            } else {
              user = await Student.findById(decoded.id);
              if (user) {
                req.user = {
                  id: user._id,
                  role: 'student',
                  collageId: user.collageId,
                  branchId: user.branchId,
                  hodId: user.hodId,
                  teacherId: user.teacherId, // If you have this relationship
                };
                sperr = true;
              } else {
                // No matching user found
                req.user = null;
                sperr = false;
              }
            }
          }
        }
      }
    }
    
      
    if(!sperr){
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
