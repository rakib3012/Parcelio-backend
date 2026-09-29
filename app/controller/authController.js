import authService from "../service/authService.js";

const register = async (req, res, next) => {
  try {
    const { userProfile, token } = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { userProfile, token },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { userProfile, token } = await authService.loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { userProfile, token },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userProfile = await authService.getAuthenticatedUserProfile(
      req.user.identifier
    );

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: { userProfile },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getProfile,
};
