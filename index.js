const express = require("express");
const app = express();
const dotenv=require("dotenv");

const userRoutes=require("./routes/user")
const authRoutes=require("./routes/auth")
const productRoutes=require("./routes/productRoute")
const cartRoutes=require("./routes/cartRoute")

dotenv.config();
require('./connection')
app.use(express.json());
app.use("/api/user/",userRoutes);
app.use("/api/auth/",authRoutes);
app.use("/api/product/",productRoutes);
app.use("/api/cart/",cartRoutes);
const port=process.env.PORT || 5500;


console.log(port);
app.listen(port, () => {
    console.log("Backend is running");
});