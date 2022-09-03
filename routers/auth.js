const router = require('express').Router();
const { User, Product, Cart, Order } = require("../models/schemas");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(
        req.body.password, 
        process.env.PASS_SEC).toString()
    });
    try{
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    }
    catch(e)
    {
        res.status(500).json(e);
    }
    
});

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user)
        {
            res.status(401).json("wrong credentials1");
        }

        const hashedpassword = cryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const orginalPassword = hashedpassword.toString(cryptoJS.enc.Utf8);

        if(orginalPassword != req.body.password)
        {
            res.status(401).send("wrong credentials2");
        }

        const accessToken = jwt.sign ({
            id: user._id,
            isAdmin: user.isAdmin
        }, 
        process.env.JWT_SEC,
        {expiresIn: "3d"}
        );

        const { password, ...others} = user._doc; // ... represents array 
        res.status(200).json({...others, accessToken});
    }

    catch(e){
        res.status(500).json(e);
    }
})

module.exports = router;