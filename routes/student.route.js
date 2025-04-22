const express = require('express');
const router = express.Router();
// const authenticate = require('../middlewares/authenticate');
const { addStudent } = require('../controllers/student.controller');


// ---------------CRUD Api of architecture--------------------
router.post('/register', addStudent);


module.exports = router;
