const express=require('express'),

reviewRouter=express.Router(),

reviewController=require('../controllers/reviewController');

reviewRouter.get('/',reviewController.getReviews);

reviewRouter.get('/:id',reviewController.getOneReview);

reviewRouter.post('/',reviewController.createReview);

reviewRouter.put('/:id',reviewController.updateReview);

reviewRouter.delete('/:id',reviewController.deleteReview);

module.exports=reviewRouter;