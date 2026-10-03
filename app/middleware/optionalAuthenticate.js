import jwt from "jsonwebtoken";
import config from "../config/index.js";
import User from "../models/UserModel.js";

const optionalAuthenticate = async (req, _res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      const token = authorizationHeader.split(" ")[1];

      if (token) {
        const decodedPayload = jwt.verify(token, config.jwtSecret);

        const authenticatedUser = await User.findById(decodedPayload.userId)
          .select("-password")
          .lean();

        if (authenticatedUser) {
          req.user = {
            identifier: authenticatedUser._id,
            fullName: authenticatedUser.fullName,
            emailAddress: authenticatedUser.emailAddress,
            role: authenticatedUser.role,
          };
        }
      }
    }

    next();
  } catch (_error) {
    // If token is invalid or expired, continue request as guest without failing
    next();
  }
};

export default optionalAuthenticate;
