const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    image: { type: String, required: true, trim: true },

    // Optional but common e-commerce fields
    countInStock: { type: Number, default: 0, min: 0 },
    category: { type: String, trim: true, maxlength: 100 },
    brand: { type: String, trim: true, maxlength: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

