const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token." });
    return null;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res
      .status(500)
      .json({ message: "Server misconfigured: JWT_SECRET missing." });
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({ message: "Not authorized, user not found." });
      return null;
    }

    return user;
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed." });
    return null;
  }
};

// JWT verification for any authenticated user (cart, orders, etc.)
const protect = async (req, res, next) => {
  const user = await verifyToken(req, res);
  if (!user) return;

  req.user = user;
  next();
};

// JWT verification + isAdmin check (product management)
const authMiddleware = async (req, res, next) => {
  const user = await verifyToken(req, res);
  if (!user) return;

  if (!user.isAdmin) {
    return res.status(403).json({ message: "Not authorized as an admin." });
  }

  req.user = user;
  next();
};

module.exports = authMiddleware;
module.exports.protect = protect;
