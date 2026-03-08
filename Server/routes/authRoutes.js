// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/authController");

// POST /api/auth/register - Register new admin
router.post("/register", registerAdmin);

// POST /api/auth/login - Login admin
router.post("/login", loginAdmin);

module.exports = router;
