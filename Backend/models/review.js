const mongoose = require('mongoose'),

review_schema = new mongoose.Schema({
    review:{type:String,required:true},
    book_id : {type:String , required:true , ref:"book"},
    user_id : {type:String , required:true , ref:"user"}
}),

review_model = mongoose.model('Review',review_schema);

module.exports = review_model