const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token =
      authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ message: "Server misconfigured: JWT_SECRET missing." });
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed." });
  }
};

module.exports = authMiddleware;

