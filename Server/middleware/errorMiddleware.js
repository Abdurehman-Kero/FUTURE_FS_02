// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error("Error:", err);

  // MySQL duplicate entry error
  if (err.code === "ER_DUP_ENTRY") {
    const message = "Duplicate entry - this record already exists";
    return res.status(400).json({
      success: false,
      message,
      error: message,
    });
  }

  // MySQL foreign key constraint error
  if (err.code === "ER_NO_REFERENCED_ROW") {
    const message = "Referenced record does not exist";
    return res.status(400).json({
      success: false,
      message,
      error: message,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: "Authentication failed",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
      error: "Please login again",
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};

module.exports = errorHandler;
