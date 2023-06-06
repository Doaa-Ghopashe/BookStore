const bookModel = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    //pagination
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let query = bookModel.find(queryObj);
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 30;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    //excute query
    const book = await query
      .populate({
        path: "AuthorId",
      })
      .populate({
        path: "categoryId",
      });
     //const book = await bookModel.find({});
    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "failed",
      err: error.message,
    });
  }
};
const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.find({ _id: id });
    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      err: error.message,
    });
  }
};
const addNewBook = async (req, res) => {
  console.log(req.body);

  try {
    // img='assets/imgs/books/'+req.body.photo.split("\\")[2]
    // console.log(img);
    let newBook ={
              title: req.body.title,
              description: req.body.desc,
              AuthorId: req.body.AuthorId,
              categoryId: req.body.categoryId,
              photo:req.file.path
            //  photo:img
          }
    const addBook = await bookModel.create(
      newBook
     
    );
    res.status(200).json({
      status: "success",
      data: {
        addBook,
        //photo: req.file.path
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      err: error.message,
    });
  }
};
const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {...req.body};
    const Book = await bookModel.findOneAndUpdate({ _id: id }, data, {new: true});
    res.status(200).json({
      status: "success",
      data: "Updated Book successfully",
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      err: error.message,
    });
  }
};
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await bookModel.findOneAndRemove({ _id: id });
    res.status(200).json({
      status: "success",
      data: "deleted successfully",
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      err: error.message,
    });
  }
};
const deleteAllBooks = async (req, res) => {
  try {
    const deleteAll = await bookModel.find({}).deleteMany({});
    res.status(200).json({
      status: "success",
      data: "deleted All successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      err: error.message,
    });
  }
};
module.exports = {
  getAllBooks,
  getOneBook,
  editBook,
  deleteBook,
  addNewBook,
  deleteAllBooks,
};
