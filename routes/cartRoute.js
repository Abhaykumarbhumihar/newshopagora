const router=require("express").Router();
const Cart = require("../models/cart");
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

// Agora App ID and App Certificate (replace with your actual credentials)
const APP_ID = '66389225174d4459a2338888c17a6537';
const APP_CERTIFICATE = '16cbb5fa884845eea72c4bf530b13b50';


const { verifyToken, verifytokenAndAuthorization } = require("./verifytoken")

router.post("/addcart",verifyToken,async (req,res)=>{

    //console.log(req.body);
    

    const newCart = new Cart(req.body);
    console.log(newCart);
    try{
        const savedCart=await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
});


//get ll product
router.get("/getallCart",async(req,res)=>{
   
    try {
        // Use populate to get data for userId and products.productId
        const allcart = await Cart.find().populate({
            path: "userId",
            model: "Users", 
            select: "-password -__v -createdAt -updatedAt"
        }).populate({
            path: "products.productId",
            model: "Product",
            select:"-__v -updatedAt -createdAt"
        });

        res.status(200).json(allcart);
    } catch (err) {
        res.status(500).json(err);
    }

})









router.post('/generateagoratoken', (req, res) => {
    try {
        const channelid = req.body.channelid;
console.log(channelid);
        const uid = 0;
        const role = RtcRole.PUBLISHER;

        const expirationTimeInSeconds = 6600;

        // Generate the token
        const key = RtcTokenBuilder.buildTokenWithUid(
            APP_ID,
            APP_CERTIFICATE,
            channelid,
            uid,
            role,
            expirationTimeInSeconds
        );

        res.status(200).json({ token: key });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
























module.exports=router;
