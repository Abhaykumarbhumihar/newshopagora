const mongoose = require("mongoose");
const productSchmea = new mongoose.Schema(
    {
        title: {
            type: String, require: true, uinque: true
        },
        description: {
            type: String, require: true
        },
        img: {
            type: String, require: true
        },
        categories: {
            type: Array
        },
        size: {
            type: String, require: true
        },
        color: {
            type: String, require: true
        },
        price: {
            type: Number, require: true
        },

    }, { timestamps: true }
)

module.exports = mongoose.model("Product", productSchmea);