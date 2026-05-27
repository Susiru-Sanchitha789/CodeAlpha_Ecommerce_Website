const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

const sampleProducts = [
  {
    title: "Classic T-Shirt",
    price: 499,
    description: "Soft cotton t-shirt with a classic fit.",
    image: "https://via.placeholder.com/600x600?text=Classic+T-Shirt",
    category: "Fashion",
    brand: "CodeAlpha",
    countInStock: 25,
  },
  {
    title: "Wireless Headphones",
    price: 1999,
    description: "Comfortable wireless headphones with rich sound.",
    image: "https://via.placeholder.com/600x600?text=Wireless+Headphones",
    category: "Electronics",
    brand: "CodeAlpha",
    countInStock: 15,
  },
  {
    title: "Smart Watch",
    price: 2999,
    description: "Track your fitness and notifications on the go.",
    image: "https://via.placeholder.com/600x600?text=Smart+Watch",
    category: "Electronics",
    brand: "CodeAlpha",
    countInStock: 10,
  },
  {
    title: "Coffee Mug",
    price: 299,
    description: "Ceramic mug perfect for your morning coffee.",
    image: "https://via.placeholder.com/600x600?text=Coffee+Mug",
    category: "Home",
    brand: "CodeAlpha",
    countInStock: 40,
  },
];

// GET /api/seed
router.get("/", async (req, res) => {
  try {
    const existing = await Product.countDocuments();
    if (existing > 0) {
      return res.json({ message: "Products already exist. Seed skipped." });
    }

    const created = await Product.insertMany(sampleProducts);
    return res.status(201).json({ message: "Seeded products", products: created });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

module.exports = router;

