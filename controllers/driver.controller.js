const Driver = require('../models/driver.model');
const { encrypt, decrypt } = require('../utils/cryptoUtils');
const findSameUsername = require('../utils/findUniqueUsername');

exports.registerDriver = async (req, res) => {
     try {
          const role = req.user.role
          if (role !== 1 && role !== 2 & role !== 3) return res.status(400).json({ message: "Unauthorized access" })
          let { username, email, password, adminId, userId } = req.body;
          if (!username || !email || !password) return res.status(400).json({ message: 'Username, email, and password are required.' });
          if (role === 3) {
               adminId = req.user.adminId;
               userId = req.user.id;
          };
          const userExists = await findSameUsername(username);
          if (userExists.exists) return res.status(400).json(userExists.message);

          const emailExists = await Driver.findOne({ email });
          if (emailExists) return res.status(400).json({ message: 'Email already in use.' });

          const encryptedPassword = encrypt(password);
          const newDriver = new Driver({
               username,
               email,
               password: encryptedPassword,
               adminId,
               userId,
          });

          await newDriver.save();
          return res.status(201).json({
               message: 'Driver created successfully.',
               newDriver
          });
     } catch (error) {
          console.error('Error registering driver:', error);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};

exports.updateDriver = async (req, res) => {
     try {
          const { driverId } = req.params;
          const { username, email, password } = req.body;
          if (!driverId) return res.status(400).json({ message: 'Driver ID is required.' });
          if (!username && !email && !password) return res.status(400).json({ message: 'At least one field (username, email, password) must be provided for update.' });

          const driver = await Driver.findById(driverId);
          if (!driver) return res.status(404).json({ message: 'Driver not found.' });

          if (username && username !== driver.username) {
               const userExists = await findSameUsername(username);
               if (userExists.exists) return res.status(400).json(userExists.message);
               driver.username = username;
          }

          if (email && email !== driver.email) {
               const emailExists = await Driver.findOne({ email });
               if (emailExists) return res.status(400).json({ message: 'Email already in use.' });
               driver.email = email;
          }

          if (password) driver.password = encrypt(password);

          await driver.save();
          delete driver.password;
          return res.status(200).json({ message: 'Driver updated successfully.', driver });
     } catch (error) {
          console.error('Error updating driver:', error);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};

exports.getDriverById = async (req, res) => {
     try {
          const { id } = req.params;
          if (!id) return res.status(400).json({ message: 'Driver ID is required.' });

          const driver = await Driver.findById(id);
          if (!driver) return res.status(404).json({ message: 'Driver not found.' });

          driver.password = undefined;
          return res.status(200).json({ message: 'Driver retrieved successfully.', driver });
     } catch (error) {
          console.error('Error retrieving driver:', error);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};

exports.getAllDrivers = async (req, res) => {
     try {
          const role = req.user.role;
          if (role !== 1 && role !== 2 && role !== 3) return res.status(400).json({ message: "Unauthorized access" });
          let filter = {};
          if (role === 2) filter.adminId = req.user.id;
          if (role === 3) filter.userId = req.user.id;

          const drivers = await Driver.find(filter);
          if (!drivers || drivers.length === 0) return res.status(404).json({ message: 'No drivers found.' });

          drivers.forEach(driver => {
               driver.password =  decrypt(driver.password);
          });
          return res.status(200).json({ message: 'Drivers retrieved successfully.', drivers });
     } catch (error) {
          console.error('Error retrieving drivers:', error);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};
