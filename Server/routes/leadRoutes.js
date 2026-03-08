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

// All routes require authentication
router
  .route("/")
  .post(protect, validateLead, handleValidationErrors, createLead)
  .get(protect, getLeads);

router
  .route("/:id")
  .get(protect, getLead)
  .put(protect, validateLead, handleValidationErrors, updateLead)
  .delete(protect, deleteLead);

module.exports = router;
