const router = require('express').Router();
const { User, Product, Cart, Order } = require("../models/schemas");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//ADD PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (e) {
        res.status(500).json(e);
    }
})

//UPDATE PRODUCT
router.put("/:id",verifyTokenAndAdmin, async(req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true}
        );
        res.status(200).json(updatedProduct);
    }
    catch(e)
    {
        res.status(500).json(e);
    }
});

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async(req, res) => { 
    try {
        await User.findByIdAndDelete(req.params.id);
        req.status(200).json("Product has been deleted successfully...");
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET PRODUCT
router.get("/find/:id", async(req, res) => { 
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL PRODUCTS
router.get("/", async(req, res) => { 
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        if(qNew)
        {
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }
        else if(qCategory)
        {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            });
        }
        else{
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;