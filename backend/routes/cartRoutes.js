const express = require("express");
const mongoose = require("mongoose");
const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");

const router = express.Router();

// GET /api/cart  (protected)
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    return res.json(cart || { user: req.user._id, items: [] });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

// POST /api/cart  (protected)  body: { productId, qty }
router.post("/", protect, async (req, res) => {
  try {
    const { productId, qty } = req.body || {};
    const quantity = Number(qty);

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Valid productId is required." });
    }
    if (!Number.isFinite(quantity) || quantity < 1) {
      return res.status(400).json({ message: "qty must be a number >= 1." });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $setOnInsert: { user: req.user._id, items: [] } },
      { new: true, upsert: true }
    );

    const existingIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].qty = quantity;
    } else {
      cart.items.push({ product: productId, qty: quantity });
    }

    await cart.save();
    const populated = await Cart.findById(cart._id).populate("items.product");
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

module.exports = router;

