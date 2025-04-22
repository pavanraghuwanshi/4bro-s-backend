const mongoose = require('mongoose');
const { decrypt, encrypt } = require('../utils/cryptoUtils');


const teacherSchema = new mongoose.Schema({
  teacherName: { type: String,},
//   profileImage: { type: String, },
  teacherEmail: { type: String, },
  teacherPhone: { type: String,},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, default: 5 }, 
  collageId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Collage' },
  branchId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  hodId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Hod' },
  firebaseToken: [{ type: String }],

  
},{
  timestamps: true
});


teacherSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }
  next();
});

teacherSchema.methods.comparePassword = async function(password) {

  const decryptedPassword = decrypt(this.password);
  return password === decryptedPassword;
};


module.exports = mongoose.model('Teacher', teacherSchema);