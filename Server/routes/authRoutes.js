// Server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} = require("../middleware/validationMiddleware");

// PUBLIC route - only login is public
router.post("/login", validateLogin, handleValidationErrors, loginAdmin);

// PROTECTED routes - only existing admins can create new admins
router.post(
  "/register",
  protect,
  validateRegister,
  handleValidationErrors,
  registerAdmin,
);

// PROTECTED route - get current user profile
router.get("/me", protect, getMe);

module.exports = router;
