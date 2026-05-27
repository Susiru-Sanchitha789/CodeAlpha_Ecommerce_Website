const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

module.exports = router;

