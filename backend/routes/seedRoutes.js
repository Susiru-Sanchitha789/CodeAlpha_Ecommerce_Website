const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

const sampleProducts = [
  {
    title: "Aura Silk Scarf",
    price: 4990,
    description: "100% Pure silk handcrafted scarf for an elegant look.",
    image: "https://images.unsplash.com/photo-1584273143981-a3c05a1ffeae?w=600&q=80",
    category: "Fashion",
    brand: "Aura Luxe",
    countInStock: 25,
  },
  {
    title: "Minimalist Leather Bag",
    price: 12990,
    description: "Premium handcrafted leather bag for the modern professional.",
    image: "https://images.unsplash.com/photo-1594223274512-ad4883739ff0?w=600&q=80",
    category: "Accessories",
    brand: "Aura Luxe",
    countInStock: 15,
  },
  {
    title: "Classic Gold Timepiece",
    price: 29990,
    description: "A timeless gold watch that defines sophistication.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    category: "Accessories",
    brand: "Aura Luxe",
    countInStock: 10,
  },
  {
    title: "Ceramic Minimalist Mug",
    price: 1500,
    description: "Hand-finished ceramic mug in ivory finish.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&q=80",
    category: "Home",
    brand: "Aura Luxe",
    countInStock: 40,
  },
  // Aura Luxe Premium Collection
  {
    title: "Silk Evening Gown",
    price: 45000,
    description: "Elegant floor-length silk gown for special occasions.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    category: "Fashion",
    brand: "Aura Luxe",
    countInStock: 5,
  },
  {
    title: "Designer Sunglasses",
    price: 8500,
    description: "UV-protected classic aviators with gold finish.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    category: "Accessories",
    brand: "Aura Luxe",
    countInStock: 20,
  },
  {
    title: "Suede Ankle Boots",
    price: 18000,
    description: "Handcrafted Italian suede boots for premium comfort.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "Fashion",
    brand: "Aura Luxe",
    countInStock: 8,
  },
  {
    title: "Pearl Stud Earrings",
    price: 5500,
    description: "Natural freshwater pearls with 18k gold posts.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    category: "Accessories",
    brand: "Aura Luxe",
    countInStock: 12,
  },
  {
    title: "Matte Black Fountain Pen",
    price: 3200,
    description: "Luxury writing instrument for the sophisticated writer.",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be0b55f?w=600&q=80",
    category: "Accessories",
    brand: "Aura Luxe",
    countInStock: 30,
  },
  {
    title: "Cashmere Throw Blanket",
    price: 12500,
    description: "Ultra-soft cashmere blend in a neutral ivory tone.",
    image: "https://images.unsplash.com/photo-1620706857370-e1b917228833?w=600&q=80",
    category: "Home",
    brand: "Aura Luxe",
    countInStock: 15,
  },
  {
    title: "Vintage Brass Table Lamp",
    price: 9800,
    description: "Art deco inspired brass lamp to illuminate your space.",
    image: "https://images.unsplash.com/photo-1534187884196-56338d4d877e?w=600&q=80",
    category: "Home",
    brand: "Aura Luxe",
    countInStock: 7,
  },
  {
    title: "Leather Portfolio",
    price: 7500,
    description: "Slim leather portfolio for your documents and iPad.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    category: "Accessories",
    brand: "Aura Luxe",
    countInStock: 18,
  },
  {
    title: "Silk Pocket Square",
    price: 2200,
    description: "Add a touch of class to your blazer.",
    image: "https://images.unsplash.com/photo-1605371924599-2d0365b5abe0?w=600&q=80",
    category: "Fashion",
    brand: "Aura Luxe",
    countInStock: 25,
  },
  {
    title: "Wool Fedora Hat",
    price: 4800,
    description: "Classic wool fedora for a sharp, timeless silhouette.",
    image: "https://images.unsplash.com/photo-1533827432537-7013374885c8?w=600&q=80",
    category: "Fashion",
    brand: "Aura Luxe",
    countInStock: 10,
  },
  {
    title: "Aura Signature Scent",
    price: 6500,
    description: "A blend of sandalwood, amber, and vanilla.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
    category: "Home",
    brand: "Aura Luxe",
    countInStock: 50,
  },
  {
    title: "Marble Coaster Set",
    price: 1800,
    description: "Set of 4 handcrafted white marble coasters.",
    image: "https://images.unsplash.com/photo-1615873968403-89b0686ada92?w=600&q=80",
    category: "Home",
    brand: "Aura Luxe",
    countInStock: 22,
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

