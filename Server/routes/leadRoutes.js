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

// POST   /api/leads     - Create new lead
// GET    /api/leads     - Get all leads
router.route("/").post(createLead).get(getLeads);

// GET    /api/leads/:id - Get single lead
// PUT    /api/leads/:id - Update lead
// DELETE /api/leads/:id - Delete lead
router.route("/:id").get(getLead).put(updateLead).delete(deleteLead);

module.exports = router;
