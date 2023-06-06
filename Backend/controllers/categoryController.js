const categoryModel=require('../models/category');

const getAllCategories=async(req,res)=>{
    try {
        //  pagination
    // query at url
    const queryObj = {...req.query};
    const excludedFields = ['page','limit']
    excludedFields.forEach(el => delete queryObj[el]);
    
    let query = categoryModel.find(queryObj);
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 30;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numPages = await categoryModel.countDocuments();
      if (skip >= numPages) throw new Error("This page does not exist");
    }

    //excute query
    const categories = await query;
            res.status(200).json({
            status: "success",
            data: { categories }
        })
    } catch (error) {
        res.status(401).json({
            status: "failed",
            err: error.message
        })
    }
};
const getOneCategory=async(req,res)=>{
    try {
        const {id} = req.params
        const category = await categoryModel.find({_id:id})
        res.status(200).json({
            status: "success",
            data:{category}
        })
    } catch (error) {
        res.status(401).json({
            status: "failed",
            err: error.message
        })
    }
};
const addNewCategory=async(req,res)=>{
    try {
        const data={...req.body}
        const newCategory= await categoryModel.create(data)
        res.status(200).json({
            status: "added successfully",
            data:{newCategory}
        })
    } catch (error) {
        res.status(401).json({
            status: "failed to add",
            err: error.message
        })
    }
};
const editCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const data=req.body
        const editCategory= await categoryModel.findOneAndUpdate({_id:id},data,{new:true})
        res.status(200).json({
            status: "Updated successfully",
            data: {editCategory}
        })
    } catch (error) {
       res.status(401).json({
        status: "failed to add",
        err: error.message
       })
    }
};
const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const deleteCategory=await categoryModel.findOneAndDelete({_id:id})
        res.status(200).json({
            status: "deleted successfully"
        })
    } catch (error) {
        res.status(401).json({
            status: "failed to delete",
            err: error.message
        })
    }
};

const deleteAllCategories= async(req,res)=>{
    try {
      
       const deleteAll= await categoryModel.find({}).deleteMany({})
       res.status(200).json({
       status: 'success',
       data:"deleted All successfully"
   });
    } catch (error) {
       res.status(404).json({
           status:"failed",
           err:error.message
       });   
    }
}

module.exports={getAllCategories,getOneCategory,editCategory,deleteCategory,addNewCategory, deleteAllCategories}