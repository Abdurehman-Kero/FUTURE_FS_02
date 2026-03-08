// routes/leadRoutes.js
const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");
const { protect } = require("../middleware/authMiddleware"); // NEW

// All routes now require authentication
router
  .route("/")
  .post(protect, createLead) // Protected
  .get(protect, getLeads); // Protected

router
  .route("/:id")
  .get(protect, getLead) // Protected
  .put(protect, updateLead) // Protected
  .delete(protect, deleteLead); // Protected

module.exports = router;
