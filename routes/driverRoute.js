const express = require('express');
const router = express.Router();
const { registerDriver, updateDriver, getDriverById, getAllDrivers } = require('../controllers/driver.controller');
const authenticate = require('../middlewares/authMiddleware');

router.post('/register-driver', authenticate, registerDriver);

router.get('/get-driver/:id', authenticate, getDriverById);
router.get('/get-all-drivers', authenticate, getAllDrivers);

router.patch('/update-driver', authenticate, updateDriver);


module.exports = router;
