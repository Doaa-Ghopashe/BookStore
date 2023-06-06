const reservedbooksModel = require("../models/reservedbooks"),

    getAllReservedBooks = async (req, res) => {
        try {
            await reservedbooksModel.find((err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            }).populate({
                path: "book_id", populate: {
                    path: 'AuthorId'
                }
            })

        } catch (err) {
            next({ status: errors[err.message].status, message: errors[err.message].errmessage })
        }
    },

    getOneReservedBook = async (req, res) => {
        try {
            let { id } = req.params;
            await reservedbooksModel.find({ _id: id }, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            })
        } catch (err) {
            next({ status: errors[err.message].status, message: errors[err.message].errmessage })
        }
    },

    reserveBook = async (req, res) => {
        try {
            await reservedbooksModel.create({ ...req.body }, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            })
        } catch (err) {
            next({ status: errors[err.message].status, message: errors[err.message].errmessage })
        }
    },

    editReservedBook = async (req, res) => {
        try {
            let { id } = req.params;
            await reservedbooksModel.findByIdAndUpdate({ _id: id }, req.body, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            })
        } catch (err) {
            next({ status: errors[err.message].status, message: errors[err.message].errmessage })
        }
    },

    deleteReservedBook = async (req, res) => {
        try {
            let { id } = req.params;
            await reservedbooksModel.findByIdAndRemove({ _id: id }, (err, data) => {
                if (!err) return res.status(200).json(data);

                throw new Error("notFound")
            })
        } catch (err) {
            next({ status: errors[err.message].status, message: errors[err.message].errmessage })
        }
    };


module.exports = {
    getAllReservedBooks,
    getOneReservedBook,
    editReservedBook,
    deleteReservedBook,
    reserveBook
};
