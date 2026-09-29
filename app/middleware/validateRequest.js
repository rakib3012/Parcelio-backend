import AppError from "../utility/AppError.js";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    // In Express 5, req.params and req.query are read-only getters.
    // Only reassign req.body with the Zod-parsed (sanitized) value.
    if (validationResult.data.body) {
      req.body = validationResult.data.body;
    }

    next();
  };
};

export default validateRequest;
