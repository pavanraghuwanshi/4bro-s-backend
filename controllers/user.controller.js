const User = require('../models/user.model');
const { encrypt } = require('../utils/cryptoUtils');
const findSameUsername = require('../utils/findUniqueUsername');

exports.registerUser = async (req, res) => {
     try {
          const role = req.user.role
          if (role !== 1 && role !== 2) return res.status(400).json({ message: "Unauthorized access" })
          let { username, email, password, adminId } = req.body;
          if (!username || !email || !password) return res.status(400).json({ message: 'Username, email, and password are required.' });
          if (role === 2) adminId = req.user.id;
          const userExists = await findSameUsername(username);
          if (userExists.exists) return res.status(400).json(userExists.message);
          const emailExists = await User.findOne({ email });
          if (emailExists) return res.status(400).json({ message: 'Email already in use.' });

          const encryptedPassword = encrypt(password);
          const newUser = new User({
               username,
               email,
               password: encryptedPassword,
               adminId,
          });

          await newUser.save();
          delete newUser.password;
          return res.status(201).json({ message: 'User created successfully.', newUser });
     } catch (error) {
          console.error('Error registering user:', error);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};

exports.updateUser = async (req, res) => {
     try {
          const role = req.user.role
          if (role !== 1 && role !== 2 && role !== 3) return res.status(400).json({ message: "Unauthorized access" })
          const { id } = req.params;
          if (!id) return res.status(400).json({ message: 'User ID is required.' });
          const { username, email, password } = req.body;
          if (!username && !email && !password) return res.status(400).json({ message: 'At least one field (username, email, password) must be provided for update.' });

          const user = await User.findById(id);
          if (!user) return res.status(404).json({ message: 'User not found.' });

          if (username && username !== user.username) {
               const userExists = await findSameUsername(username);
               if (userExists.exists) return res.status(400).json(userExists.message);
               user.username = username;
          }

          if (email && email !== user.email) {
               const emailExists = await User.findOne({ email });
               if (emailExists) return res.status(400).json({ message: 'Email already in use.' });
               user.email = email;
          }

          if (password) user.password = encrypt(password);

          const updatedUser = await user.save();
          delete updatedUser.password;
          return res.status(200).json({ message: 'User updated successfully.', updatedUser });
     } catch (error) {
          console.error('Error updating user:', error.message);
          return res.status(500).json({ message: 'Internal server error.' + error.message });
     }
};
