const express = require('express');
const router = express.Router();
// const authenticate = require('../middlewares/authenticate');
const { registerDriver, updateDriver } = require('../controllers/driver.controller');
const authenticate = require('../middlewares/authMiddleware');


// ---------------CRUD Api of architecture--------------------
router.post('/register-driver', authenticate, registerDriver);
router.post('/update-driver', authenticate, updateDriver);


module.exports = router;
