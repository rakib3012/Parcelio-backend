const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";
  let errors = [];

  // Mongoose validation error
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(error.errors).map((err) => ({
      field: err.path,
      message: err.message,
    }));
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(error.keyPattern)[0];
    message = `${duplicateField} already exists`;
    errors = [{ field: duplicateField, message: `This ${duplicateField} is already registered` }];
  }

  // Mongoose cast error (invalid ObjectId)
  if (error.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${error.path}: ${error.value}`;
  }

  // Zod validation error
  if (error.name === "ZodError") {
    statusCode = 400;
    message = "Validation failed";
    errors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
  }

  // Log unexpected errors
  if (!error.isOperational) {
    console.error("Unexpected error:", error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export default errorHandler;
