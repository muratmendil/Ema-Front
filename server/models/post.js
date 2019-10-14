var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create Schema
var postSchema = new Schema({
  title: String,
  firstname: String,
  lastname: String,
  created_at: {
    type: Date,
    default: Date.now()
  },
  message: {
    type: String
  },
  userId: Number
});

module.exports = mongoose.model('Post', postSchema);
