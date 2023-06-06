const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, unique: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "category",
  },
  AuthorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "author",
  },
  desc: { type: String },
  photo: { 
    type: String,
   },
  avgRating: { type: Number },
});
const bookModel = mongoose.model("book", bookSchema);
module.exports = bookModel;