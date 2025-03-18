const express = require('express');
const Product = require('../models/productModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/add', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

module.exports = router;
