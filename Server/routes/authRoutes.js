// routes/authRoutes.js
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

// Public routes with validation
router.post(
  "/register",
  validateRegister, // This validates the input
  handleValidationErrors, // This checks for errors
  registerAdmin, // This runs ONLY if validation passes
);

router.post("/login", validateLogin, handleValidationErrors, loginAdmin);

// Protected route
router.get("/me", protect, getMe);

module.exports = router;
