const mongoose = require("mongoose");

const reservedBookSchema = new mongoose.Schema({
    book_id:{type:String,ref:"book",required:true},
    user_id:{type:String,ref:"user",required:true},
    shelve:String
});
const reservedbookModel = mongoose.model("reservedbook", reservedBookSchema);
module.exports = reservedbookModel;
