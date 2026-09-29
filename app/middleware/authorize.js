import AppError from "../utility/AppError.js";

const authorize = (...allowedRoles) => {
  return (req, _res, next) => {
    if (!req.user) {
      throw new AppError("Authentication required.", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("You do not have permission to perform this action.", 403);
    }

    next();
  };
};

export default authorize;
