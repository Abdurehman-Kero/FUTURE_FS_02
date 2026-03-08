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
const { protect } = require("../middleware/authMiddleware");
const {
  validateLead,
  handleValidationErrors,
} = require("../middleware/validationMiddleware");

// PUBLIC route - anyone can create a lead (contact form)
router.post("/", validateLead, handleValidationErrors, createLead);

// PROTECTED routes - only admins can access these
router.get("/", protect, getLeads);
router.get("/:id", protect, getLead);
router.put("/:id", protect, validateLead, handleValidationErrors, updateLead);
router.delete("/:id", protect, deleteLead);

module.exports = router;
