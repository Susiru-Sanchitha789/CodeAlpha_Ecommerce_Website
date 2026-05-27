const adminMiddleware = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as an admin." });
};

module.exports = adminMiddleware;
