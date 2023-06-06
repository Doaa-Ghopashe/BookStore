const review_model = require('../models/review'),

    errors = require('../errormessages/errors'),

    //the five api methods 

    createReview = async (req, res, next) => {

        try {
            await review_model.create({ ...req.body }, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    },

    updateReview = async (req, res, next) => {
        try {
            let { id } = req.params;
            await review_model.findByIdAndUpdate({ _id: id },req.body,(err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    },

    deleteReview = async (req, res, next) => {
        try {
            let { id } = req.params;
            await review_model.findByIdAndRemove({ _id: id }, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    },

    getOneReview = async (req, res, next) => {
        try {
            let { id } = req.params;
            await review_model.find({ _id: id }, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    },

    getReviews = async (req, res, next) => {
        try {
            await review_model.find((err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            }).populate({
                path: "user_id",
              })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    };

//exports
module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getReviews,
    getOneReview
};