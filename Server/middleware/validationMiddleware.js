// middleware/validationMiddleware.js
const { body, validationResult } = require("express-validator");

// Validation rules for lead creation/update
const validateLead = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),

  body("company")
    .optional()
    .isString()
    .withMessage("Company must be a string")
    .isLength({ max: 100 })
    .withMessage("Company name too long"),

  body("source")
    .optional()
    .isIn(["website", "referral", "social", "email", "call", "other"])
    .withMessage(
      "Invalid source. Must be: website, referral, social, email, call, or other",
    ),

  body("status")
    .optional()
    .isIn(["new", "contacted", "qualified", "converted", "lost"])
    .withMessage(
      "Invalid status. Must be: new, contacted, qualified, converted, or lost",
    ),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be text")
    .isLength({ max: 1000 })
    .withMessage("Notes too long (max 1000 characters)"),
];

// Validation rules for registration
const validateRegister = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage("Password must contain at least one letter and one number"),
];

// Validation rules for login
const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  validateLead,
  validateRegister,
  validateLogin,
  handleValidationErrors,
};
