// controllers/leadController.js
const Lead = require("../models/leadModel");

// @desc    Create new lead
// @route   POST /api/leads
const createLead = async (req, res, next) => {
  try {
    // Add the source if not provided
    const leadData = {
      ...req.body,
      source: req.body.source || "website",
      status: req.body.status || "new",
    };

    const leadId = await Lead.create(leadData);

    // Get the created lead to return full data
    const newLead = await Lead.findById(leadId);

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: newLead,
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};

// @desc    Get all leads with filtering and sorting
// @route   GET /api/leads
const getLeads = async (req, res, next) => {
  try {
    const { status, source, sort, limit } = req.query;

    // Get all leads (we'll add filtering later)
    let leads = await Lead.findAll();

    // Filter by status if provided
    if (status) {
      leads = leads.filter((lead) => lead.status === status);
    }

    // Filter by source if provided
    if (source) {
      leads = leads.filter((lead) => lead.source === source);
    }

    // Apply limit if provided
    if (limit) {
      leads = leads.slice(0, parseInt(limit));
    }

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
const getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
const updateLead = async (req, res, next) => {
  try {
    // Check if lead exists
    const existingLead = await Lead.findById(req.params.id);

    if (!existingLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Update the lead
    const updated = await Lead.update(req.params.id, req.body);

    // Get the updated lead
    const updatedLead = await Lead.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
const deleteLead = async (req, res, next) => {
  try {
    // Check if lead exists
    const existingLead = await Lead.findById(req.params.id);

    if (!existingLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Delete the lead
    await Lead.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
};
