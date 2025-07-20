const Admin = require('../models/admin.model');
const { encrypt } = require('../utils/cryptoUtils');
const findSameUsername = require('../utils/findUniqueUsername');

exports.registerAdmin = async (req, res) => {
     try {
          const { username, email, password, notificationAllow } = req.body;
          if (!username || !email || !password) return res.status(400).json({ message: 'Username and password are required.' });

          const userExists = await findSameUsername(username);
          if (userExists.exists) return res.status(400).json(userExists.message);

          const admin = new Admin({
               username,
               email,
               password: encrypt(password),
               notificationAllow
          });

          await admin.save();
          delete admin.password;
          return res.status(201).json({ message: 'Admin created successfully.', admin });
     } catch (error) {
          console.error('Error registering admin:', error.message);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};

exports.updateAdmin = async (req, res) => {
     try {
          const { id } = req.params;
          if (!id) return res.status(400).json({ message: 'Admin ID is required.' });
          const { username, email, password, notificationAllow } = req.body;
          if (!username && !email && !password && notificationAllow === undefined) return res.status(400).json({ message: 'At least one field (username, email, password, notificationAllow) must be provided for update.' });

          const admin = await Admin.findById(id);
          if (!admin) return res.status(404).json({ message: 'Admin not found.' });

          if (username && username !== admin.username) {
               const userExists = await findSameUsername(username);
               if (userExists.exists) return res.status(400).json(userExists.message);
               admin.username = username;
          }

          if (email && email !== admin.email) {
               const emailExists = await Admin.findOne({ email });
               if (emailExists) return res.status(400).json({ message: 'Email already in use.' });
               admin.email = email;
          }

          if (password) admin.password = encrypt(password);
          if (notificationAllow !== undefined) admin.notificationAllow = notificationAllow;

          await admin.save();
          delete admin.password;
          return res.status(200).json({ message: 'Admin updated successfully.', admin });
     } catch (error) {
          console.error('Error updating admin:', error);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};
