const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// POST /api/orders (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body || {};

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "orderItems is required." });
    }
    if (typeof totalPrice !== "number" || totalPrice < 0) {
      return res.status(400).json({ message: "totalPrice must be a number >= 0." });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

module.exports = router;

