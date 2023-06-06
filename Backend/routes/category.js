const express=require('express');
const categoryRouter=express.Router();
const categoryController=require('../controllers/categoryController.js')

const{validate}= require('../Middleware/validation/validator.js')
const{addCategoryValidateRule,updateCategoryValidateRule}=require('../validators/validator.js');

categoryRouter.get('/',categoryController.getAllCategories);
categoryRouter.get('/:id',categoryController.getOneCategory);

categoryRouter.post('/',validate(addCategoryValidateRule),categoryController.addNewCategory);
categoryRouter.put('/:id',validate(updateCategoryValidateRule),categoryController.editCategory)
categoryRouter.delete('/:id',categoryController.deleteCategory);
categoryRouter.delete('/',categoryController.deleteAllCategories);

module.exports=categoryRouter;