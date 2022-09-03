const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
}, 
    {timestamps: true}
);

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true
    },
    categories:{
        type: Array
    },
    size:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
}, 
    {timestamps: true}
);

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
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
    ]
}, 
    {timestamps: true}
);

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
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
    amount:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        default: "pending"
    }
}, 
    {timestamps: true}
);
const User = new mongoose.model("User", userSchema);
const Product = new mongoose.model("Product", productSchema);
const Cart = new mongoose.model("Cart", cartSchema);
const Order = new mongoose.model("Order", orderSchema);
module.exports = {
    User, Product, Cart, Order
} ;
