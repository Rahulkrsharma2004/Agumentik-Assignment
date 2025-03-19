const express = require('express');
const Order = require('../models/orderModel.js');

const router = express.Router();

// ✅ Get all orders (No Auth)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find(); // No user-specific filter
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// ✅ Create order (No Auth)
router.post('/add', async (req, res) => {
    try {
        const { products, totalPrice } = req.body;
        const order = new Order({ products, totalPrice }); // No user ID required
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error creating order" });
    }
});

module.exports = router;
