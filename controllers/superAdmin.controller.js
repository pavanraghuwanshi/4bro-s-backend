const { encrypt } = require('../utils/cryptoUtils');
const SuperAdmin = require('../models/superAdmin.model');
const findSameUsername = require('../utils/findUniqueUsername');

exports.registersuperAdmin = async (req, res) => {
     try {
          const { username, email, password } = req.body;
          if (!username || !email || !password) return res.status(400).json({ message: 'Username, email, and password are required' });

          const userExists = await findSameUsername(username);
          if (userExists.exists) return res.status(400).json(userExists.message);

          const encryptedPassword = encrypt(password);
          const superadmin = new SuperAdmin({ username, email, password: encryptedPassword, role: 1 });
          await superadmin.save();
          return res.status(201).json({ message: 'Superadmin created successfully', superadmin });
     } catch (error) {
          console.error('Error registering superadmin:', error);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};

exports.updatesuperAdmin = async (req, res) => {
     try {
          const { id } = req.params
          if (!id) return res.status(400).json({ message: 'Superadmin ID is required.' });
          if (!req.body.username && !req.body.email && !req.body.password) return res.status(400).json({ message: 'At least one field (username, email, password) must be provided for update.' });

          const { username, email, password } = req.body;
          const superadmin = await SuperAdmin.findById(id);
          if (!superadmin) return res.status(404).json({ message: 'User not found.' });

          if (username && username !== superadmin.username) {
               const userExists = await findSameUsername(username);
               if (userExists.exists) return res.status(400).json(userExists.message);
               superadmin.username = username;
          }

          if (email) superadmin.email = email;
          if (password) superadmin.password = encrypt(password);

          const updatedSuperadmin = await superadmin.save();
          return res.status(200).json({ message: 'Superadmin updated successfully', updatedSuperadmin });
     } catch (error) {
          console.error('Error updating superadmin:', error.message);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};