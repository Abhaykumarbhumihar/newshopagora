const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken")

//REGISTER



router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error (MongoError code for duplicate key violation)
            const duplicateFields = Object.keys(err.keyPattern);
            res.status(400).json({ error: `Duplicate fields: ${duplicateFields.join(', ')}` });
        } else {
            res.status(500).json(err);
        }
    }
});


//login

router.post("/login", async (req, res) => {
    try {

        const user = await User.findOne({ username: req.body.username });
      
        !user && res.status(401).json("Wrong credentials");

        const hashedpasword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC);
        const passwordd = hashedpasword.toString(CryptoJS.enc.Utf8);
        passwordd !==req.body.password && res.status(401).json("Wrong Passwrod");

        const accessToekn=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SEC,{expiresIn:"3d"})

        const { password,__v, ...others}=user._doc;
        res.status(200).json({...others,accessToekn});

    } catch (err) {
        console.log(err);

        res.status(500).json(err);
    }

});
module.exports = router;
