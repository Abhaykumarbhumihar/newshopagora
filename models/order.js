const mongoose = require("mongoose");
const orderSchmea = new mongoose.Schema(
    {
        userId: {
            type: String, require: true
        },
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        ammount: {
            type: Number,
            require: true
        },
        address: {
            type: Object, required: true
        },
        status: {
            type: String, default: "pending"
        },

    }, { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchmea);