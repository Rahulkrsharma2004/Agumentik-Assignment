const express = require('express');
const Order = require('../models/orderModel.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
});

// Create an order
router.post('/', authMiddleware, async (req, res) => {
    const { products, totalPrice } = req.body;
    const order = new Order({ user: req.user.id, products, totalPrice });
    await order.save();
    res.status(201).json(order);
});

module.exports = router;
