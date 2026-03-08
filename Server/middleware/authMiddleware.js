// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (format: "Bearer TOKEN")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token
      req.admin = await Admin.findById(decoded.id);

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: "Not authorized - admin not found",
        });
      }

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({
        success: false,
        message: "Not authorized - invalid token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized - no token",
    });
  }
};

module.exports = { protect };
