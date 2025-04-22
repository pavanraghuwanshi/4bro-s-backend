const mongoose = require('mongoose');
const { decrypt, encrypt } = require('../utils/cryptoUtils');



const branchSchema = new mongoose.Schema({
     branchName: { type: String, },
     branchLocation: { type: String,},
     branchEmail: { type: String,},
     branchPhone: { type: String, }, 
     // hodsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'H' }], 
     username: { type: String, required: true, unique: true, },
     password: { type: String, required: true },
     role: { type: Number, default: 3}, 
     collageId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Collage' },
     firebaseToken: [{ type: String }],
    },
   {
     timestamps: true
   });

   
   branchSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = encrypt(this.password);
  }
  next();
});

branchSchema.methods.comparePassword = async function(password) {

  const decryptedPassword = decrypt(this.password);
  return password === decryptedPassword;
};


   module.exports = mongoose.model('Branch', branchSchema);
