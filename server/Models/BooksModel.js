const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    name:{type:String},
    authour:{type:String},
    IdNumber:{type:Number},
    rate:{type:Number},
    quantity:{type:Number},
    state:{type:Number}
  });
  const Book = mongoose.model('books', bookSchema);

  module.exports =Book