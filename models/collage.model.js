// //models/Company.js
const mongoose = require('mongoose');
const { decrypt, encrypt } = require('../utils/cryptoUtils');


const collageSchema = new mongoose.Schema(
  {
    collageName: { type: String, required: true },
    collegeEmail: { type: String },
    collagePhone: { type: String, },
    collageAddress: { type: String, },
    deanName: { type: String, },
    deanEmail: { type: String, },
    gstNo: { type: String },
    panNo: { type: String },
    businessType: { type: String },
    branchesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 2 },
    firebaseToken: [{ type: String }],
    notificationAllow: { type: Boolean, default: false },


  },
  {
    timestamps: true
  }
);


collageSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }
  next();
});

collageSchema.methods.comparePassword = async function (password) {

  const decryptedPassword = decrypt(this.password);
  return password === decryptedPassword;
};



module.exports = mongoose.model('Collage', collageSchema);
