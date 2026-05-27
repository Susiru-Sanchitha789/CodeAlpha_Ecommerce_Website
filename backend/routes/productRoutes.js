const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/products - fetch all products (public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

// GET /api/products/:id - fetch single product (public)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

// POST /api/products - create product (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, price, description, image, countInStock, category, brand } =
      req.body || {};

    if (!title || price === undefined || !description || !image) {
      return res.status(400).json({
        message: "Please provide title, price, description, and image.",
      });
    }

    const numericPrice = Number(price);
    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: "price must be a number >= 0." });
    }

    const product = await Product.create({
      title,
      price: numericPrice,
      description,
      image,
      countInStock: countInStock ?? 0,
      category,
      brand,
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

// PUT /api/products/:id - update product (protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const { title, price, description, image, countInStock, category, brand } =
      req.body || {};

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (image !== undefined) product.image = image;
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (countInStock !== undefined) product.countInStock = countInStock;

    if (price !== undefined) {
      const numericPrice = Number(price);
      if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ message: "price must be a number >= 0." });
      }
      product.price = numericPrice;
    }

    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

// DELETE /api/products/:id - remove product (protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    await product.deleteOne();
    return res.json({ message: "Product removed." });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
});

module.exports = router;
