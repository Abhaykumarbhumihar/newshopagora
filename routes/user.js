const User = require("../models/user");
const CryptoJS = require("crypto-js");
const { verifyToken, verifytokenAndAuthorization } = require("./verifytoken")
const router = require("express").Router();
//const CryptoJS = require("crypto-js");


//get user
router.get("/getUser", verifyToken, async (req, res) => {
    try {
        const userData = await User.findById(req.user.id);
        const { password, __v, ...others } = userData._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }

})


//get ll user
router.get("/alluser",verifyToken,async(req,res)=>{

    try{
const alluser=await User.find();
res.status(200).json(alluser);
    }catch(err){
        res.status(500).json(err);
    }

})


//Update user
router.post("/updateuser", verifyToken, async (req, res) => {

     if (req.body.password) {

        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString();
     }
    
    console.log("after encrypt",req.body);
     console.log(req.user.id);
       try {
           const updatedUser = await User.findByIdAndUpdate(req.user.id, {
               $set: req.body
           }, { new: true });

           res.status(200).json(updatedUser);
       } catch (err) {
           res.status(500).json(err);
       }
});




module.exports = router;






// router.get("/usertest",(req,res)=>{
// res.send("User test complete");
// });


// router.post("/userpost",(req,res)=>{
// const username=req.body.username;
// res.send(username);
// });
