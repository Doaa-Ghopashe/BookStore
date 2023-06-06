const express=require('express');
const bookRouter=express.Router();
const bookController=require('../controllers/bookController.js')
const{validate}= require('../Middleware/validation/validator.js')
const{addBookValidateRule,updateValidatieRule}=require('../validators/validator.js');

bookRouter.get('/',bookController.getAllBooks);
bookRouter.get('/:id',bookController.getOneBook);


const multer = require('multer');
const { multerFilter, multerStorageBook } = require('../Middleware/upload.js');

const upload=multer({
    fileFilter: multerFilter,
    storage:multerStorageBook
})
bookRouter.post('/',upload.single('photo'),
 validate(addBookValidateRule)
 ,bookController.addNewBook);

bookRouter.put('/:id',
validate(updateValidatieRule),
bookController.editBook);

bookRouter.delete('/:id',bookController.deleteBook,(req,res)=>{
});
bookRouter.delete('/',bookController.deleteAllBooks);



module.exports=bookRouter;