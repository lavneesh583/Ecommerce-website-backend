const router = require('express').Router();
const { User, Product, Cart, Order } = require("../models/schemas");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//ADD ORDER
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder); 
    } catch (e) {
        res.status(500).json(e);
    }
})

//UPDATE ORDER
router.put("/:id",verifyTokenAndAdmin, async(req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true}
        );
        res.status(200).json(updatedOrder);
    }
    catch(e)
    {
        res.status(500).json(e);
    }
});

//DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async(req, res) => { 
    try { 
        await Order .findByIdAndDelete(req.params.id);
        req.status(200).json("Order  has been deleted successfully...");
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET User ORDERs
router.get("/find/:userId", verifyTokenAndAuthorization, async(req, res) => { 
    try {
        const Orders = await Order.find({userId: req.params.userid});
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin,async(req, res) => { 
    try {
        const Orders = await Order .find();
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;