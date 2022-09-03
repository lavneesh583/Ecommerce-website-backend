const router = require('express').Router();
const { User, Product, Cart, Order } = require("../models/schemas");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//ADD Cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart); 
    } catch (e) {
        res.status(500).json(e);
    }
})

//UPDATE Cart
router.put("/:id",verifyTokenAndAuthorization, async(req, res) => {
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true}
        );
        res.status(200).json(updatedCart);
    }
    catch(e)
    {
        res.status(500).json(e);
    }
});

//DELETE Cart
router.delete("/:id", verifyTokenAndAuthorization, async(req, res) => { 
    try { 
        await Cart.findByIdAndDelete(req.params.id);
        req.status(200).json("Cart has been deleted successfully...");
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET User  Cart
router.get("/find/:userId", verifyTokenAndAuthorization, async(req, res) => { 
    try {
        const Cart = await Cart.findOne({userId: req.params.userid});
        res.status(200).json(Cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL CARTS
router.get("/", async(req, res) => { 
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;