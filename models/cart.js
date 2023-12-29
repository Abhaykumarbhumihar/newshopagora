const mongoose = require("mongoose");
const cartSchmea = new mongoose.Schema(
    {
       
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
        products:[
            {
              
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                },
                quantity:{
                    type:Number,
                    default:1
                }
            }
        ],
       

    }, { timestamps: true }
)

module.exports = mongoose.model("Cart", cartSchmea);