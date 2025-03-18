const express = require('express');
const ProductModel = require("../models/productModel");
const CartModel = require('../models/cartModel');
const cartRouter = express.Router();


cartRouter.get("/", async (req, res) => {
  // const userId = req.body.userId;
  try {
    const carts = await CartModel.find()
    const myCart = await Promise.all(
      carts.map(async(ele)=>{
        const product = await ProductModel.findOne({_id:ele.productId})
        return product
      })
    )
    return res.status(200).send({ success: true, myCart });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
});


cartRouter.post("/add/:id", async (req, res) => {
   const productId = req.params.id
   console.log(productId)
   
  try {
      const cart = new CartModel({ productId });
      await cart.save()
      return res.status(201).send({ message: `Product Added Successfully` });
    
  } catch (error) {
    return res.status(404).send({ message: "Something went wrong 123abc" });
  }
});


module.exports = cartRouter;