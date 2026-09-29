import jwt from "jsonwebtoken";
import config from "../config/index.js";
import AppError from "../utility/AppError.js";
import User from "../models/UserModel.js";

const authenticate = async (req, _res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required. Please log in.", 401);
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Authentication required. Please log in.", 401);
    }

    const decodedPayload = jwt.verify(token, config.jwtSecret);

    const authenticatedUser = await User.findById(decodedPayload.userId)
      .select("-password")
      .lean();

    if (!authenticatedUser) {
      throw new AppError("User associated with this token no longer exists.", 401);
    }

    req.user = {
      identifier: authenticatedUser._id,
      fullName: authenticatedUser.fullName,
      emailAddress: authenticatedUser.emailAddress,
      role: authenticatedUser.role,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token. Please log in again.", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired. Please log in again.", 401));
    }
    next(error);
  }
};

export default authenticate;
