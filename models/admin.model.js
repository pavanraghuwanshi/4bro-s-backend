const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    role: { type: Number, default: 2 },
    firebaseToken: [{ type: String }],
    notificationAllow: { type: Boolean, default: false },
    createdAt: { type: Date, default: () => new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)) }
  },
  { versionKey: false }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;