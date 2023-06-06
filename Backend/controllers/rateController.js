const rate_model = require('../models/rating'),

    errors = require('../errormessages/errors'),

//the five api methods
    createRate = async (req, res, next) => {
        try {
            // console.log(req)
            await rate_model.create({ ...req.body }, (err, data) => {
                if (!err) return res.status(200).json(data);

                // console.log(err)
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    },

    updateRate = async (req, res, next) => {
        
        try {
            let { id } = req.params;
            // console.log(id)
            await rate_model.findOneAndUpdate({ _id: id },req.body,(err, data) => {
                // console.log(req.body)
                if (!err) return res.status(200).send(data);

                throw new Error('notFound')
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    },

    deleteRate = async (req, res, next) => {
        try {
            let { id } = req.params;
            await rate_model.findByIdAndRemove({ _id: id }, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error('notFound')
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    },

    getBookRate = async (req, res, next) => {
        try {
            let { id } = req.params;
            await rate_model.find({_id:id}, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error('notFound')
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    };
    getAllRates= async (req, res, next) => {
        try {
            await rate_model.find((err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error('notFound')
            })
        } catch (err) {
            next({status:errors[err.message].status,message:errors[err.message].errmessage})
        }
    }
//exports

module.exports = {
    createRate,
    updateRate,
    deleteRate,
    getBookRate,
    getAllRates
};