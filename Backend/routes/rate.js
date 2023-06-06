const express=require('express'),

 rateRouter=express.Router(),

 rateController=require('../controllers/rateController');

rateRouter.get('/:id',rateController.getBookRate);

rateRouter.get('/',rateController.getAllRates);

rateRouter.post('/',rateController.createRate);

rateRouter.put('/:id',rateController.updateRate);

rateRouter.delete('/:id',rateController.deleteRate);

module.exports=rateRouter;