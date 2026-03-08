// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");  
// Import routes
const leadRoutes = require("./routes/leadRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "CRM Backend is running!" });
});

// Use routes
app.use("/api/auth", authRoutes); // NEW - Authentication routes

app.use("/api/leads", leadRoutes);

// 404 handler for routes that don't exist - FIXED: removed the "*"
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
