const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/superAdmin.model');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Driver = require('../models/driver.model');
const { decrypt } = require('../utils/cryptoUtils');

exports.login = async (req, res) => {
     try {
          const { username, password } = req.body;
          if (!username || !password) return res.status(400).json({ message: 'username or password are required' });

          const [superAdmin, admin, user, driver] = await Promise.all([
               SuperAdmin.findOne({ username }).lean(),
               Admin.findOne({ username }).lean(),
               User.findOne({ username }).lean(),
               Driver.findOne({ username }).lean(),
          ]);

          let foundUser = superAdmin || admin || user || driver;
          if (!foundUser) return res.status(400).json({ message: 'Invalid username or password' });

          const decryptedPassword = decrypt(foundUser.password);
          if (password !== decryptedPassword) return res.status(400).json({ message: 'Invalid username or password' });

          const token = jwt.sign(
               {
                    id: foundUser._id,
                    username: foundUser.username,
                    role: foundUser.role,
               },
               process.env.JWT_SECRET,
          );

          return res.status(200).json({
               message: "Welcome" + foundUser.username,
               token,
               user: {
                    id: foundUser._id,
                    username: foundUser.username,
                    role: foundUser.role,
                    email: foundUser.email,
               },
          });
     } catch (error) {
          return res.status(500).json({ message: error.message });
     }
};
