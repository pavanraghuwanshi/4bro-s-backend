const express = require('express');
const router = express.Router();
// const authenticate = require('../middlewares/authenticate');
const { registerDriver, updateDriver } = require('../controllers/driver.controller');


// ---------------CRUD Api of architecture--------------------
router.post('/register-driver', registerDriver);
router.post('/update-driver', updateDriver);


module.exports = router;
