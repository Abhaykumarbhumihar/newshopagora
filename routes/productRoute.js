const router=require("express").Router();
const Product = require("../models/product");
const { verifyToken, verifytokenAndAuthorization } = require("./verifytoken")


router.post("/addproduct",verifyToken,async (req,res)=>{

    const newProduct = new Product(req.body);
    console.log(newProduct);
    try{
        const savedProduct=await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

//get ll product
router.get("/getallproduct",async(req,res)=>{
    try{
const allproduct=await Product.find();
res.status(200).json(allproduct);
    }catch(err){
        res.status(500).json(err);
    }

})


module.exports=router;
