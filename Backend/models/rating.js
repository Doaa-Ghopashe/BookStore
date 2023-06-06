const mongoose = require('mongoose'),

rate_schema = new mongoose.Schema({
    rate_val : {type:Number , required:true , max:5},
    book_id : {type:String , required:true , ref:"book",unique:false },
    user_id : {type:String , required:true , ref:"user",unique:false }
}),

rate_model = mongoose.model('Rate',rate_schema);

module.exports = rate_model;