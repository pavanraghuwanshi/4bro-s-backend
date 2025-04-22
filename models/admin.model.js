const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/cryptoUtils');


const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now },
});


adminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }
  next();
});

adminSchema.methods.comparePassword = async function(password) {

  const decryptedPassword = decrypt(this.password);
  return password === decryptedPassword;
};


module.exports = mongoose.model('Admin', adminSchema);
