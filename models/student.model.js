const mongoose = require('mongoose');
const { decrypt, encrypt } = require('../utils/cryptoUtils');


const studentSchema = new mongoose.Schema({
  studentName: { type: String,},
//   profileImage: { type: String, },
  studentEmail: { type: String, },
  studentPhone: { type: String,},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, default: 6 }, 
  collageId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Collage' },
  branchId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  hodId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Hod' },
  teacherId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  firebaseToken: [{ type: String }],

  
},{
  timestamps: true
});


studentSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }
  next();
});

studentSchema.methods.comparePassword = async function(password) {

  const decryptedPassword = decrypt(this.password);
  return password === decryptedPassword;
};


module.exports = mongoose.model('Student', studentSchema);