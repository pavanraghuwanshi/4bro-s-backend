const mongoose = require('mongoose');
const { decrypt, encrypt } = require('../utils/cryptoUtils');

const hodSchema = new mongoose.Schema({
  hodName: { type: String, },
  hodEmail: { type: String,}, 
  hodPhone: { type: String,  }, 
//   salesmansIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salesman' }], 
  username: { type: String, required: true, unique: true, },
  password: { type: String, required: true },
  role: { type: Number, default: 4 }, 
  collageId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Collage' },
  branchId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  firebaseToken: [{ type: String }],

},{
  timestamps: true
});


hodSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }
  next();
});

hodSchema.methods.comparePassword = async function(password) {

  const decryptedPassword = decrypt(this.password);
  return password === decryptedPassword;
};



module.exports = mongoose.model('Hod',hodSchema );
