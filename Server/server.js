// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const cors = require("cors");

// Create express app
const app = express();

// Middleware - functions that run before routes
app.use(cors()); // Allow frontend to access API
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// Basic test route
app.get("/test", (req, res) => {
  res.json({ message: "CRM Backend is running!" });
});

// Define port
const PORT = 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
