const express=require('express'),

reservedBookRouter=express.Router(),

reservedBookController=require('../controllers/reservedBooksController');

reservedBookRouter.get('/:id',reservedBookController.getOneReservedBook);

reservedBookRouter.get('/',reservedBookController.getAllReservedBooks);

reservedBookRouter.post('/',reservedBookController.reserveBook);

reservedBookRouter.put('/:id',reservedBookController.editReservedBook);

reservedBookRouter.delete('/:id',reservedBookController.deleteReservedBook);

module.exports=reservedBookRouter;