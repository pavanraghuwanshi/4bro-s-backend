const Driver = require('../models/driver.model');
const { encrypt } = require('../utils/cryptoUtils');
const findSameUsername = require('../utils/findUniqueUsername');

exports.registerDriver = async (req, res) => {
     try {
          const { username, email, password, adminId, userId } = req.body;
          if (!username || !email || !password) return res.status(400).json({ message: 'Username, email, and password are required.' });

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
