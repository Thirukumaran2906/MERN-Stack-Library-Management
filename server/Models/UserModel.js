const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    number:{type:Number},
    address:{type:String},
    books:[],
  });
  const User = mongoose.model('users', userSchema);
 

  module.exports = User