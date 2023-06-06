const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
  firstName:{
      type: String
  },
  lastName:{type:String},
  dateOfBirth:{type:String},
  breif:{type: String,required: true},
  Image:{type:String,default:"default-avatar.png"}
},{
  timestamps:true
});

const authorModel = mongoose.model('author', authorSchema);
module.exports = authorModel;