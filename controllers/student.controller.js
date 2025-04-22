const mongoose = require('mongoose');
const Student = require('../models/student.model');
const findSameUsername  = require('../utils/findUniqueUsername'); 

exports.addStudent = async (req, res) => {
  const {
    studentName,
    studentEmail,
    studentPhone,
    username,
    password,
    collageId,
    branchId,
    hodId,
    teacherId,
  } = req.body;

  try {
    const existingUserByUsername = await findSameUsername(username);
    if (existingUserByUsername.exists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }


    const studentId = new mongoose.Types.ObjectId();
    const newStudent = new Student({
      _id: studentId,
      studentName,
      studentEmail,
      studentPhone,
      username,
      password, 
      collageId,
      branchId,
      hodId,
      teacherId,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully",
      student: newStudent
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
