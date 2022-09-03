const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_URI).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log("No Connection");
})