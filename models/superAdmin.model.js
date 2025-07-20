const mongoose = require('mongoose');

const superadminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 1 },
    createdAt: { type: Date, default: () => new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)) }
  },
  { versionKey: false }
);

const SuperAdmin = mongoose.model('SuperAdmin', superadminSchema);
module.exports = SuperAdmin;