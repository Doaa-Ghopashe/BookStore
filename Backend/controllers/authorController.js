const authorModel = require('../models/author');

function add(req, res){
    authorModel.create({...req.body,
        Image:req.file.path
    },(err,userData)=>{
        if(!err) return res.status(201).json(userData);
        res.status(500).json({Error:"DB error"});
    })

    console.log(req.body);
}
function list(req,res){
    let authors =[]
    authorModel.find({},(err, data)=>{
        authors = data
        if(!err) return res.status(201).json(authors);
        res.status(500).json({Error:"DB error"});
        
    })
}


function getById(req,res){
    const {id}= req.params
    authorModel.findById(id , (err ,data)=>{
        user =data
    if (!err) return res.status(200).json(user)
    res.status(500).json({Error : "DB_error"})          
    }) 
}

function remove(req , res) {
    const {id}= req.params
    authorModel.findByIdAndDelete(id , (err)=>{
        if (!err){
            res.send( "deleted");
        }
        else{
            console.log(err);
        }
     }) 
}


function edit(req , res) {
    const {id}= req.params
    let {firstName} = req.body
    let {lastName} =  req.body
    let {dateOfBirth} =  req.body
    let {breif} =  req.body
    let {Image} =  req.body
    authorModel.findByIdAndUpdate(id , {firstName , lastName , dateOfBirth ,breif,Image }  , (err)=>{
        if (!err){
            authorModel.findById(id ,(err,data)=>{
                if (!err) return res.status(201).json(data)
                    console.log(err)
                    res.status(500).json({Error : "DB_error"})
            })
        }
        else{
            console.log(err);
        }
     })

}
const deleteAll = async (req, res) => {
    try {
      const deleteAll = await authorModel.find({}).deleteMany({});
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

module.exports = {add , list , getById , remove ,edit ,deleteAll}