const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    role: { type: Number, default: 4 },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firebaseToken: [{ type: String }],
    createdAt: { type: Date, default: () => new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)) }
  },
  { versionKey: false }
);

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
